import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEFAULT_IMAGE = "/brand/packaging.png";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      description,
      price = null,
      weight = null,
      pieces = null,
      ingredients = null,
      wholesalePrice = null,
      discount = 0,
      category,
      options = "[]",
      isActive = true,
      isFeatured = false,
      isBestSeller = false,
      isNew = false,
      sortOrder = 0,
      image = DEFAULT_IMAGE,
    } = body;

    // Validate
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "اسم المنتج مطلوب" }, { status: 400 });
    }
    if (!description || description.length < 10) {
      return NextResponse.json({ error: "الوصف مطلوب" }, { status: 400 });
    }
    if (!category) {
      return NextResponse.json({ error: "التصنيف مطلوب" }, { status: 400 });
    }

    const product = await prisma.product.create({
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

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/products:", error);
    return NextResponse.json({ error: "فشل إضافة المنتج" }, { status: 500 });
  }
}
