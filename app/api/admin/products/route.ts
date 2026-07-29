import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data: products, error } = await supabaseAdmin
      .from('products')
      .select('*')
      .order('sortOrder', { ascending: true })
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(products || []);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'فشل جلب المنتجات' }, { status: 500 });
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
      image = "/brand/packaging.png",
    } = body;

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "اسم المنتج مطلوب" }, { status: 400 });
    }
    if (!description || description.length < 10) {
      return NextResponse.json({ error: "الوصف مطلوب" }, { status: 400 });
    }
    if (!category) {
      return NextResponse.json({ error: "التصنيف مطلوب" }, { status: 400 });
    }

    const { data: product, error } = await supabaseAdmin
      .from('products')
      .insert({
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
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
        image,
        sortOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: "فشل إضافة المنتج" }, { status: 500 });
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('POST /api/admin/products:', error);
    return NextResponse.json({ error: "فشل إضافة المنتج" }, { status: 500 });
  }
}
