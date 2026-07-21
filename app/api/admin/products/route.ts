import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/admin/products:", error);
    return NextResponse.json({ error: "فشل جلب المنتجات" }, { status: 500 });
  }
}

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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const price = parseFloat(String(formData.get("price") || "0"));
    const category = String(formData.get("category") || "").trim();
    const options = String(formData.get("options") || "[]");
    const isActive = formData.get("isActive") !== "false";
    const sortOrder = parseInt(String(formData.get("sortOrder") || "0"), 10);
    const imageFile = formData.get("image") as File | null;
    const existingImage = String(formData.get("existingImage") || "");

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

    let image = existingImage || "/brand/packaging.png";
    if (imageFile && imageFile.size > 0) {
      image = await uploadToCloudinary(imageFile);
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        options,
        image,
        isActive,
        sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/products:", error);
    return NextResponse.json({ error: "فشل إضافة المنتج" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = String(formData.get("id") || "").trim();
    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const price = parseFloat(String(formData.get("price") || "0"));
    const category = String(formData.get("category") || "").trim();
    const options = String(formData.get("options") || "[]");
    const isActive = formData.get("isActive") !== "false";
    const sortOrder = parseInt(String(formData.get("sortOrder") || "0"), 10);
    const imageFile = formData.get("image") as File | null;
    const existingImage = String(formData.get("existingImage") || "");

    if (!id) {
      return NextResponse.json({ error: "معرف المنتج مطلوب" }, { status: 400 });
    }
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "اسم المنتج يجب أن يكون 2 أحرف على الأقل" }, { status: 400 });
    }
    if (!description || description.length < 10) {
      return NextResponse.json({ error: "الوصف يجب أن يكون 10 أحرف على الأقل" }, { status: 400 });
    }
    if (Number.isNaN(price) || price < 0) {
      return NextResponse.json({ error: "السعر يجب أن يكون رقماً موجباً" }, { status: 400 });
    }

    let image = existingImage;
    if (imageFile && imageFile.size > 0) {
      image = await uploadToCloudinary(imageFile);
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        category,
        options,
        image,
        isActive,
        sortOrder: Number.isNaN(sortOrder) ? 0 : sortOrder,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("PUT /api/admin/products:", error);
    return NextResponse.json({ error: "فشل تحديث المنتج" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "معرف المنتج مطلوب" }, { status: 400 });
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/products:", error);
    return NextResponse.json({ error: "فشل حذف المنتج" }, { status: 500 });
  }
}
