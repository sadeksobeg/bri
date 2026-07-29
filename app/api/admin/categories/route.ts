import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const { data: categories, error } = await supabaseAdmin
      .from('categories')
      .select('*')
      .order('sortOrder', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(categories || []);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'فشل في جلب التصنيفات' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, color, icon } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "اسم التصنيف مطلوب" }, { status: 400 });
    }

    const { data: existing } = await supabaseAdmin
      .from('categories')
      .select('*')
      .eq('name', name.trim())
      .single();

    if (existing) {
      return NextResponse.json({ error: "هذا التصنيف موجود بالفعل" }, { status: 400 });
    }

    const { data: category, error } = await supabaseAdmin
      .from('categories')
      .insert({
        id: `cat_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
        name: name.trim(),
        description: description?.trim() || null,
        color: color || "#c9a961",
        icon: icon?.trim() || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: "فشل في إنشاء التصنيف" }, { status: 500 });
    }

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/categories:', error);
    return NextResponse.json({ error: "فشل في إنشاء التصنيف" }, { status: 500 });
  }
}
