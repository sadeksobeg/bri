import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const { data: category, error } = await supabaseAdmin
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !category) {
      return NextResponse.json({ error: "التصنيف غير موجود" }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error) {
    console.error("GET /api/admin/categories/[id]:", error);
    return NextResponse.json({ error: "فشل في جلب التصنيف" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { name, description, color, icon, sortOrder, isActive } = body;

    const { data: existing } = await supabaseAdmin
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (!existing) {
      return NextResponse.json({ error: "التصنيف غير موجود" }, { status: 404 });
    }

    if (name && name !== existing.name) {
      const { data: duplicate } = await supabaseAdmin
        .from('categories')
        .select('*')
        .eq('name', name.trim())
        .single();
      
      if (duplicate) {
        return NextResponse.json({ error: "اسم التصنيف مستخدم بالفعل" }, { status: 400 });
      }
    }

    const updateData: Record<string, unknown> = {
      name: name?.trim() || existing.name,
      sortOrder: sortOrder ?? existing.sortOrder,
      isActive: isActive ?? existing.isActive,
    };

    if (description !== undefined) updateData.description = description?.trim() || null;
    if (color !== undefined) updateData.color = color || existing.color;
    if (icon !== undefined) updateData.icon = icon?.trim() || null;

    const { data: category, error } = await supabaseAdmin
      .from('categories')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: "فشل في تحديث التصنيف" }, { status: 500 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("PUT /api/admin/categories/[id]:", error);
    return NextResponse.json({ error: "فشل في تحديث التصنيف" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;

  try {
    const { data: existing } = await supabaseAdmin
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (!existing) {
      return NextResponse.json({ error: "التصنيف غير موجود" }, { status: 404 });
    }

    const { error } = await supabaseAdmin
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json({ error: "فشل في حذف التصنيف" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/categories/[id]:", error);
    return NextResponse.json({ error: "فشل في حذف التصنيف" }, { status: 500 });
  }
}
