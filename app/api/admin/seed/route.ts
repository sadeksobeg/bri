import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const products = [
      { name: "برازق", description: "برازق ذهبي هش ومقرمش بطعم لا يُقاوم", price: 25000, weight: "250غ", pieces: 12, category: "المعمول والبسكويت", image: "/brand/packaging.png", sortOrder: 1, isFeatured: true, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "معمول الجوز", description: "معمول ذهبي طري ومفتت بحشوة جوز طبيعية", price: 35000, weight: "300غ", pieces: 15, category: "المعمول والبسكويت", image: "/brand/packaging.png", sortOrder: 2, isFeatured: true, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "معمول الفستق الحلبي", description: "معمول فاخر بحشوة فستق حلبي أصيل", price: 55000, weight: "300غ", pieces: 15, category: "المعمول والبسكويت", image: "/brand/packaging.png", sortOrder: 3, isFeatured: true, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "كرات التمر الذهبية", description: "كرات تمر طرية بمذاق استثنائي", price: 20000, weight: "200غ", pieces: 10, category: "المعمول والبسكويت", image: "/brand/packaging.png", sortOrder: 4, isFeatured: false, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "بسكويت الليمون", description: "بسكويت هش بنكهة ليمون منعشة", price: 18000, weight: "200غ", pieces: 16, category: "المعمول والبسكويت", image: "/brand/packaging.png", sortOrder: 5, isFeatured: false, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "التمرية الملكية بالطحينة", description: "تمرية مقلية مقرمشة محشوة بالطحينة الفاخرة", price: 22000, weight: "250غ", pieces: 14, category: "المعمول والبسكويت", image: "/brand/packaging.png", sortOrder: 6, isFeatured: false, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "شوكولا جوز الهند (كوكونيست)", description: "قطعة شوكولا بلجيكية بحشوة جوز الهند", price: 8000, weight: "10غ", pieces: 1, category: "شوكولا قطع صغيرة", image: "/brand/packaging.png", sortOrder: 10, isFeatured: true, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "شوكولا الكراميل", description: "قطعة شوكولا داكنة بحشوة كراميل", price: 8000, weight: "10غ", pieces: 1, category: "شوكولا قطع صغيرة", image: "/brand/packaging.png", sortOrder: 11, isFeatured: true, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "شوكولا البندق", description: "قطعة شوكولا بالحليب مع البندق المحمص", price: 8000, weight: "10غ", pieces: 1, category: "شوكولا قطع صغيرة", image: "/brand/packaging.png", sortOrder: 12, isFeatured: true, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "بار شوكولا بحشوة النسكافيه", description: "بار شوكولا بنكهة النسكافيه المميزة", price: 12000, weight: "15غ", pieces: 1, category: "شوكولا بارات", image: "/brand/packaging.png", sortOrder: 20, isFeatured: true, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "بار شوكولا دبي", description: "بار شوكولا فاخر بطعم مميز", price: 15000, weight: "15غ", pieces: 1, category: "شوكولا بارات", image: "/brand/packaging.png", sortOrder: 21, isFeatured: true, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "بار شوكولا بالمكسرات", description: "بار شوكولا محشو بالمكسرات المشكلة (لوز، جوز، فستق، كاجو، بندق، فستق حلبي)", price: 14000, weight: "15غ", pieces: 1, category: "شوكولا بارات", image: "/brand/packaging.png", sortOrder: 22, isFeatured: true, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "بار شوكولا داكن", description: "شوكولا داكنة نقية 100%", price: 35000, weight: "100غ", pieces: 1, category: "شوكولا كبيرة", image: "/brand/packaging.png", sortOrder: 30, isFeatured: true, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "بار شوكولا حلوة", description: "شوكولا بلجيكية بالحليب كريمية", price: 30000, weight: "100غ", pieces: 1, category: "شوكولا كبيرة", image: "/brand/packaging.png", sortOrder: 31, isFeatured: false, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "بار شوكولا بيضاء", description: "شوكولا بيضاء ناعمة وراقية", price: 30000, weight: "100غ", pieces: 1, category: "شوكولا كبيرة", image: "/brand/packaging.png", sortOrder: 32, isFeatured: false, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "بار شوكولا بالمكسرات", description: "شوكولا بالحليب محشوة بالمكسرات المشكلة الفاخرة", price: 40000, weight: "100غ", pieces: 1, category: "شوكولا كبيرة", image: "/brand/packaging.png", sortOrder: 33, isFeatured: true, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "بوكس شوكولا ثلاثي", description: "صندوق أنيق يحتوي 3 قطع (دارك، حلوة، بيضاء)", price: 45000, weight: "40غ", pieces: 3, category: "بوكس شوكولا", image: "/brand/packaging.png", sortOrder: 40, isFeatured: true, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "كاب كيك", description: "كاب كيك طري مع تزيين فاخر", price: 12000, weight: "60غ", pieces: 1, category: "حلويات صغيرة", image: "/brand/packaging.png", sortOrder: 50, isFeatured: true, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "تارت فواكه", description: "تارت بقاعدة هشة وحشوة فواكه موسمية طازجة", price: 15000, weight: "50غ", pieces: 1, category: "حلويات صغيرة", image: "/brand/packaging.png", sortOrder: 51, isFeatured: true, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "تارت شوكولا وفواكه", description: "تارت بقاعدة شوكولا مع طبقة فواكه طازجة", price: 16000, weight: "55غ", pieces: 1, category: "حلويات صغيرة", image: "/brand/packaging.png", sortOrder: 52, isFeatured: false, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "تارت مكسرات وفواكه", description: "تارت محشو بالمكسرات المحمصة مع طبقة فواكه", price: 16000, weight: "55غ", pieces: 1, category: "حلويات صغيرة", image: "/brand/packaging.png", sortOrder: 53, isFeatured: false, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "تارت مكسرات وشوكولا وفواكه", description: "تارت ميكس - المكسرات والشوكولا والفواكه", price: 18000, weight: "60غ", pieces: 1, category: "حلويات صغيرة", image: "/brand/packaging.png", sortOrder: 54, isFeatured: true, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
      { name: "كرات الشوكولا", description: "كرات شوكولا داكنة مغطاة", price: 10000, weight: "30غ", pieces: 3, category: "حلويات صغيرة", image: "/brand/packaging.png", sortOrder: 55, isFeatured: true, isBestSeller: false, isNew: false, isActive: true, options: "[]" },
    ];

    const productsWithIds = products.map((p, index) => ({
      ...p,
      id: `prod_${Date.now()}_${index}`,
    }));

    const { error } = await supabaseAdmin.from('products').upsert(productsWithIds, {
      onConflict: 'id'
    });

    if (error) {
      console.error('Supabase seed error:', error);
      return NextResponse.json({ error: "فشل في إضافة المنتجات" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `تم إضافة ${products.length} منتج بنجاح`,
      products: products.length,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "حدث خطأ" }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}
