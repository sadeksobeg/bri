import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const {
      name,
      description,
      price,
      weight,
      pieces,
      ingredients,
      wholesalePrice,
      discount = 0,
      category,
      options,
      isActive,
      isFeatured,
      isBestSeller,
      isNew,
      sortOrder,
      image,
    } = body;

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "اسم المنتج مطلوب" }, { status: 400 });
    }
    if (!description || description.length < 10) {
      return NextResponse.json({ error: "الوصف مطلوب" }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {
      name,
      description,
      price,
      weight,
      pieces,
      ingredients,
      wholesalePrice,
      discount,
      category,
      isActive,
      isFeatured,
      isBestSeller,
      isNew,
      sortOrder,
      image,
      updatedAt: new Date().toISOString(),
    };

    if (options !== undefined) {
      updateData.options = typeof options === 'string' ? options : JSON.stringify(options);
    }

    const { data: product, error } = await supabaseAdmin
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: "فشل تحديث المنتج" }, { status: 500 });
    }

    if (!product) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('PUT /api/admin/products/[id]:', error);
    return NextResponse.json({ error: "فشل تحديث المنتج" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase delete error:', error);
      return NextResponse.json({ error: "فشل حذف المنتج" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/admin/products/[id]:', error);
    return NextResponse.json({ error: "فشل حذف المنتج" }, { status: 500 });
  }
}
