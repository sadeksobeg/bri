import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products:", error);
    return NextResponse.json({ error: "فشل جلب المنتجات" }, { status: 500 });
  }
}
