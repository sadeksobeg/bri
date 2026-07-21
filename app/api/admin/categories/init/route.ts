import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

export async function POST() {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  try {
    // Check if categories already exist
    const existing = await prisma.category.count();
    if (existing > 0) {
      return NextResponse.json({ message: "التصنيفات موجودة مسبقاً" });
    }

    // Create default categories
    const categories = await prisma.$transaction([
      prisma.category.create({
        data: {
          name: "شوكولاتة",
          description: "تشكيلة الشوكولاتة الفاخرة",
          color: "#c9a961",
          sortOrder: 1,
        },
      }),
      prisma.category.create({
        data: {
          name: "علب",
          description: "علب الهدايا الفاخرة",
          color: "#e8b4c8",
          sortOrder: 2,
        },
      }),
      prisma.category.create({
        data: {
          name: "هدايا",
          description: "منتجات الهدايا الخاصة",
          color: "#98d8aa",
          sortOrder: 3,
        },
      }),
      prisma.category.create({
        data: {
          name: "ترافل",
          description: "حلوى الترافل اللذيذة",
          color: "#a8d8ea",
          sortOrder: 4,
        },
      }),
      prisma.category.create({
        data: {
          name: "كيك",
          description: "أصناف الكيك والحلويات",
          color: "#ffd93d",
          sortOrder: 5,
        },
      }),
    ]);

    return NextResponse.json(categories, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/categories/init:", error);
    return NextResponse.json({ error: "فشل في إنشاء التصنيفات" }, { status: 500 });
  }
}
