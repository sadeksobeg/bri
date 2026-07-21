import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return NextResponse.json({ error: "التصنيف غير موجود" }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error) {
    console.error("GET /api/admin/categories/[id]:", error);
    return NextResponse.json({ error: "فشل في جلب التصنيف" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { name, description, color, icon, sortOrder, isActive } = body;

    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "التصنيف غير موجود" }, { status: 404 });
    }

    if (name && name !== existing.name) {
      const duplicate = await prisma.category.findUnique({ where: { name: name.trim() } });
      if (duplicate) {
        return NextResponse.json({ error: "اسم التصنيف مستخدم بالفعل" }, { status: 400 });
      }
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: name?.trim() || existing.name,
        description: description?.trim() ?? existing.description,
        color: color || existing.color,
        icon: icon?.trim() ?? existing.icon,
        sortOrder: sortOrder ?? existing.sortOrder,
        isActive: isActive ?? existing.isActive,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("PUT /api/admin/categories/[id]:", error);
    return NextResponse.json({ error: "فشل في تحديث التصنيف" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const category = await prisma.category.findUnique({ where: { id } });
    if (!category) {
      return NextResponse.json({ error: "التصنيف غير موجود" }, { status: 404 });
    }

    await prisma.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/categories/[id]:", error);
    return NextResponse.json({ error: "فشل في حذف التصنيف" }, { status: 500 });
  }
}
