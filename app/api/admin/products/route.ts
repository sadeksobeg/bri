import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

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

async function saveUploadedImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = path.extname(file.name) || ".jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), buffer);
  return `/uploads/${filename}`;
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
      image = await saveUploadedImage(imageFile);
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
