import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

async function uploadToCloudinary(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "brivia/products",
    resource_type: "image",
    transformation: [
      { width: 800, height: 800, crop: "limit" },
      { quality: "auto", fetch_format: "auto" },
    ],
  });

  return result.secure_url;
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }

    const formData = await request.formData();
    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const price = parseFloat(String(formData.get("price") || "0"));
    const weight = String(formData.get("weight") || "").trim() || null;
    const pieces = parseInt(String(formData.get("pieces") || ""), 10);
    const ingredients = String(formData.get("ingredients") || "").trim() || null;
    const wholesalePrice = parseFloat(String(formData.get("wholesalePrice") || ""));
    const discount = parseFloat(String(formData.get("discount") || "0"));
    const category = String(formData.get("category") || "").trim();
    const options = String(formData.get("options") || "[]");
    const isActive = formData.get("isActive") !== "false";
    const isFeatured = formData.get("isFeatured") === "true";
    const isBestSeller = formData.get("isBestSeller") === "true";
    const isNew = formData.get("isNew") === "true";
    const sortOrder = parseInt(String(formData.get("sortOrder") || "0"), 10);
    const imageFile = formData.get("image") as File | null;

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "اسم المنتج يجب أن يكون 2 أحرف على الأقل" }, { status: 400 });
    }
    if (!description || description.length < 10) {
      return NextResponse.json({ error: "الوصف يجب أن يكون 10 أحرف على الأقل" }, { status: 400 });
    }
    if (Number.isNaN(price) || price < 0) {
      return NextResponse.json({ error: "السعر يجب أن يكون رقماً موجباً" }, { status: 400 });
    }
    if (!category || category.length < 1) {
      return NextResponse.json({ error: "التصنيف مطلوب" }, { status: 400 });
    }

    let image = existing.image;
    if (imageFile && imageFile.size > 0) {
      image = await uploadToCloudinary(imageFile);
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        weight,
        pieces: Number.isNaN(pieces) ? null : pieces,
        ingredients,
        wholesalePrice: Number.isNaN(wholesalePrice) ? null : wholesalePrice,
        discount: Number.isNaN(discount) ? 0 : discount,
        category,
        options,
        isActive,
        isFeatured,
        isBestSeller,
        isNew,
        image,
        sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("PUT /api/admin/products/[id]:", error);
    return NextResponse.json({ error: "فشل تحديث المنتج" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/products/[id]:", error);
    return NextResponse.json({ error: "فشل حذف المنتج" }, { status: 500 });
  }
}
