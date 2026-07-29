import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST() {
  try {
    const { count } = await supabaseAdmin
      .from('categories')
      .select('*', { count: 'exact', head: true });

    if (count && count > 0) {
      return NextResponse.json({ message: "التصنيفات موجودة مسبقاً" });
    }

    const categories = [
      { name: "المعمول والبسكويت", description: "تشكيلة المعمول والبسكويت الطازج", color: "#c9a961", sortOrder: 1 },
      { name: "شوكولا قطع صغيرة", description: "قطع الشوكولا البلجيكية الفاخرة", color: "#8B4513", sortOrder: 10 },
      { name: "شوكولا بارات", description: "بارات الشوكولا بمختلف النكهات", color: "#D2691E", sortOrder: 20 },
      { name: "شوكولا كبيرة", description: "ألواح الشوكولا الكبيرة", color: "#A0522D", sortOrder: 30 },
      { name: "بوكس شوكولا", description: "صناديق الهدايا الفاخرة", color: "#e8b4c8", sortOrder: 40 },
      { name: "حلويات صغيرة", description: "حلويات صغيرة متنوعة", color: "#ffd93d", sortOrder: 50 },
    ];

    const categoriesWithIds = categories.map((c, index) => ({
      ...c,
      id: `cat_${Date.now()}_${index}`,
    }));

    const { error } = await supabaseAdmin
      .from('categories')
      .insert(categoriesWithIds);

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: "فشل في إنشاء التصنيفات" }, { status: 500 });
    }

    return NextResponse.json(categoriesWithIds, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/categories/init:", error);
    return NextResponse.json({ error: "فشل في إنشاء التصنيفات" }, { status: 500 });
  }
}
