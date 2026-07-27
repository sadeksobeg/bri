import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_IMAGE = "/brand/packaging.png";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    
    const body = await request.json();
    
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }

    const {
      name = existing.name,
      description = existing.description,
      price = existing.price,
      weight = existing.weight,
      pieces = existing.pieces,
      ingredients = existing.ingredients,
      wholesalePrice = existing.wholesalePrice,
      discount = 0,
      category = existing.category,
      options = existing.options,
      isActive = true,
      isFeatured = false,
      isBestSeller = false,
      isNew = false,
      sortOrder = 0,
      image = existing.image,
    } = body;

    // Validate
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "اسم المنتج مطلوب" }, { status: 400 });
    }
    if (!description || description.length < 10) {
      return NextResponse.json({ error: "الوصف مطلوب" }, { status: 400 });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        weight,
        pieces,
        ingredients,
        wholesalePrice,
        discount,
        category,
        options: typeof options === 'string' ? options : JSON.stringify(options),
        isActive,
        isFeatured,
        isBestSeller,
        isNew,
        image: image || DEFAULT_IMAGE,
        sortOrder: typeof sortOrder === 'number' ? sortOrder : 0,
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
