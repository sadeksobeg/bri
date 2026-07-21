import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

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

async function deleteUploadIfLocal(imagePath: string) {
  if (!imagePath.startsWith("/uploads/")) return;
  try {
    await unlink(path.join(process.cwd(), "public", imagePath));
  } catch {
    // ignore missing files
  }
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
    const category = String(formData.get("category") || "").trim();
    const options = String(formData.get("options") || "[]");
    const isActive = formData.get("isActive") !== "false";
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
      const newImage = await saveUploadedImage(imageFile);
      await deleteUploadIfLocal(existing.image);
      image = newImage;
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
    await deleteUploadIfLocal(existing.image);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/products/[id]:", error);
    return NextResponse.json({ error: "فشل حذف المنتج" }, { status: 500 });
  }
}
