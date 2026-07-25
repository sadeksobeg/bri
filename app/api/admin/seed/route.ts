import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Delete existing products
    await prisma.product.deleteMany({});

    const products = [
      // المعمول والبسكويت
      { name: "برازق", description: "برازق ذهبي هش ومقرمش بطعم لا يُقاوم", price: 25000, weight: "250غ", pieces: 12, category: "المعمول والبسكويت", image: "/products/placeholder.jpg", sortOrder: 1, isFeatured: true, options: [] },
      { name: "معمول الجوز", description: "معمول ذهبي طري ومفتت بحشوة جوز طبيعية", price: 35000, weight: "300غ", pieces: 15, category: "المعمول والبسكويت", image: "/products/placeholder.jpg", sortOrder: 2, isFeatured: true, options: [] },
      { name: "معمول الفستق الحلبي", description: "معمول فاخر بحشوة فستق حلبي أصيل", price: 55000, weight: "300غ", pieces: 15, category: "المعمول والبسكويت", image: "/products/placeholder.jpg", sortOrder: 3, isFeatured: true, options: [] },
      { name: "كرات التمر الذهبية", description: "كرات تمر طرية بمذاق استثنائي", price: 20000, weight: "200غ", pieces: 10, category: "المعمول والبسكويت", image: "/products/placeholder.jpg", sortOrder: 4, isFeatured: false, options: [] },
      { name: "بسكويت الليمون", description: "بسكويت هش بنكهة ليمون منعشة", price: 18000, weight: "200غ", pieces: 16, category: "المعمول والبسكويت", image: "/products/placeholder.jpg", sortOrder: 5, isFeatured: false, options: [] },
      { name: "التمرية الملكية بالطحينة", description: "تمرية مقلية مقرمشة محشوة بالطحينة الفاخرة", price: 22000, weight: "250غ", pieces: 14, category: "المعمول والبسكويت", image: "/products/placeholder.jpg", sortOrder: 6, isFeatured: false, options: [] },

      // شوكولا قطع صغيرة
      { name: "شوكولا جوز الهند (كوكونيست)", description: "قطعة شوكولا بلجيكية بحشوة جوز الهند", price: 8000, weight: "10غ", pieces: 1, category: "شوكولا قطع صغيرة", image: "/products/placeholder.jpg", sortOrder: 10, isFeatured: true, options: [] },
      { name: "شوكولا الكراميل", description: "قطعة شوكولا داكنة بحشوة كراميل", price: 8000, weight: "10غ", pieces: 1, category: "شوكولا قطع صغيرة", image: "/products/placeholder.jpg", sortOrder: 11, isFeatured: true, options: [] },
      { name: "شوكولا البندق", description: "قطعة شوكولا بالحليب مع البندق المحمص", price: 8000, weight: "10غ", pieces: 1, category: "شوكولا قطع صغيرة", image: "/products/placeholder.jpg", sortOrder: 12, isFeatured: true, options: [] },

      // شوكولا بارات
      { name: "بار شوكولا بحشوة النسكافيه", description: "بار شوكولا بنكهة النسكافيه المميزة", price: 12000, weight: "15غ", pieces: 1, category: "شوكولا بارات", image: "/products/placeholder.jpg", sortOrder: 20, isFeatured: true, options: [] },
      { name: "بار شوكولا دبي", description: "بار شوكولا فاخر بطعم مميز", price: 15000, weight: "15غ", pieces: 1, category: "شوكولا بارات", image: "/products/placeholder.jpg", sortOrder: 21, isFeatured: true, options: [] },
      { name: "بار شوكولا بالمكسرات", description: "بار شوكولا محشو بالمكسرات المشكلة (لوز، جوز، فستق، كاجو، بندق، فستق حلبي)", price: 14000, weight: "15غ", pieces: 1, category: "شوكولا بارات", image: "/products/placeholder.jpg", sortOrder: 22, isFeatured: true, options: [] },

      // شوكولا كبيرة
      { name: "بار شوكولا داكن", description: "شوكولا داكنة نقية 100%", price: 35000, weight: "100غ", pieces: 1, category: "شوكولا كبيرة", image: "/products/placeholder.jpg", sortOrder: 30, isFeatured: true, options: [] },
      { name: "بار شوكولا حلوة", description: "شوكولا بلجيكية بالحليب كريمية", price: 30000, weight: "100غ", pieces: 1, category: "شوكولا كبيرة", image: "/products/placeholder.jpg", sortOrder: 31, isFeatured: false, options: [] },
      { name: "بار شوكولا بيضاء", description: "شوكولا بيضاء ناعمة وراقية", price: 30000, weight: "100غ", pieces: 1, category: "شوكولا كبيرة", image: "/products/placeholder.jpg", sortOrder: 32, isFeatured: false, options: [] },
      { name: "بار شوكولا بالمكسرات", description: "شوكولا بالحليب محشوة بالمكسرات المشكلة الفاخرة", price: 40000, weight: "100غ", pieces: 1, category: "شوكولا كبيرة", image: "/products/placeholder.jpg", sortOrder: 33, isFeatured: true, options: [] },

      // بوكس شوكولا
      { name: "بوكس شوكولا ثلاثي", description: "صندوق أنيق يحتوي 3 قطع (دارك، حلوة، بيضاء)", price: 45000, weight: "40غ", pieces: 3, category: "بوكس شوكولا", image: "/products/placeholder.jpg", sortOrder: 40, isFeatured: true, options: [] },

      // حلويات صغيرة
      { name: "كاب كيك", description: "كاب كيك طري مع تزيين فاخر", price: 12000, weight: "60غ", pieces: 1, category: "حلويات صغيرة", image: "/products/placeholder.jpg", sortOrder: 50, isFeatured: true, options: [] },
      { name: "تارت فواكه", description: "تارت بقاعدة هشة وحشوة فواكه موسمية طازجة", price: 15000, weight: "50غ", pieces: 1, category: "حلويات صغيرة", image: "/products/placeholder.jpg", sortOrder: 51, isFeatured: true, options: [] },
      { name: "تارت شوكولا وفواكه", description: "تارت بقاعدة شوكولا مع طبقة فواكه طازجة", price: 16000, weight: "55غ", pieces: 1, category: "حلويات صغيرة", image: "/products/placeholder.jpg", sortOrder: 52, isFeatured: false, options: [] },
      { name: "تارت مكسرات وفواكه", description: "تارت محشو بالمكسرات المحمصة مع طبقة فواكه", price: 16000, weight: "55غ", pieces: 1, category: "حلويات صغيرة", image: "/products/placeholder.jpg", sortOrder: 53, isFeatured: false, options: [] },
      { name: "تارت مكسرات وشوكولا وفواكه", description: "تارت ميكس - المكسرات والشوكولا والفواكه", price: 18000, weight: "60غ", pieces: 1, category: "حلويات صغيرة", image: "/products/placeholder.jpg", sortOrder: 54, isFeatured: true, options: [] },
      { name: "كرات الشوكولا", description: "كرات شوكولا داكنة مغطاة", price: 10000, weight: "30غ", pieces: 3, category: "حلويات صغيرة", image: "/products/placeholder.jpg", sortOrder: 55, isFeatured: true, options: [] },
    ];

    let count = 0;
    for (const product of products) {
      await prisma.product.create({
        data: { ...product, options: JSON.stringify(product.options) },
      });
      count++;
    }

    return NextResponse.json({
      success: true,
      message: `تم اضافة ${count} منتج بنجاح`,
      products: count,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "حدث خطأ: " + String(error) }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}
