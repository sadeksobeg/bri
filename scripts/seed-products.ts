import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "file:./dev.db"
    }
  }
});

async function main() {

  // ============================================
  // إنشاء التصنيفات
  // ============================================
  
  const categoriesData = [
    { 
      name: "المعمول والبسكويت", 
      description: "تشكيلة المعمول والبسكويت الدمشقي الأصيل",
      color: "#c9a961",
      icon: "🥐",
      sortOrder: 1
    },
    { 
      name: "شوكولا قطع صغيرة", 
      description: "قطع شوكولا بلجيكية صغيرة 10 غم",
      color: "#8B4513",
      icon: "🍫",
      sortOrder: 2
    },
    { 
      name: "شوكولا بارات", 
      description: "بارات شوكولا بلجيكية 15 غم",
      color: "#D2691E",
      icon: "📊",
      sortOrder: 3
    },
    { 
      name: "شوكولا كبيرة", 
      description: "بارات شوكولا بلجيكية كبيرة 100 غم",
      color: "#654321",
      icon: "🍫",
      sortOrder: 4
    },
    { 
      name: "بوكس شوكولا", 
      description: "صناديق شوكولا فاخرة",
      color: "#FFD700",
      icon: "🎁",
      sortOrder: 5
    },
    { 
      name: "حلويات صغيرة", 
      description: "تشكيلة حلويات ميني الحجم",
      color: "#FF69B4",
      icon: "🧁",
      sortOrder: 6
    }
  ];

  const createdCategories: Record<string, string> = {};
  
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat });
    createdCategories[cat.name] = created.id;
    console.log(`✓ تم إنشاء تصنيف: ${cat.name}`);
  }

  // ============================================
  // قسم المعمول والبسكويت
  // ============================================
  
  const maamoulProducts = [
    {
      name: "برازق",
      description: "برازق ذهبي هش ومقرمش بطبقة من القرفة والسميد، محشو بجوز الهند الناعم",
      price: 25000,
      weight: "250غ",
      pieces: 12,
      ingredients: "سميد، سمن بلدي، جوز هند مبشور، سكر، خميرة، قرفة",
      category: "المعمول والبسكويت",
      image: "/products/maamoul/barazek.jpg",
      sortOrder: 1,
      isFeatured: true,
      options: [
        { label: "علبة صغيرة", additionalPrice: 0 },
        { label: "علبة متوسطة", additionalPrice: 15000 },
        { label: "علبة كبيرة", additionalPrice: 30000 }
      ]
    },
    {
      name: "معمول الجوز",
      description: "معمول ذهبي طري ومفتت بحشوة جوز طبيعية، يُحضّر بعناية فائقة",
      price: 35000,
      weight: "300غ",
      pieces: 15,
      ingredients: "سميد، سمن بلدي، جوز مقطع، ماء ورد، فانيلا",
      category: "المعمول والبسكويت",
      image: "/products/maamoul/maamoul-jouz.jpg",
      sortOrder: 2,
      isFeatured: true,
      options: [
        { label: "علبة صغيرة", additionalPrice: 0 },
        { label: "علبة متوسطة", additionalPrice: 20000 },
        { label: "علبة كبيرة", additionalPrice: 40000 }
      ]
    },
    {
      name: "معمول الفستق الحلبي",
      description: "معمول فاخر بحشوة فستق حلبي أصيل، طعم لا يُقاوم مع لمسة من ماء الورد",
      price: 55000,
      weight: "300غ",
      pieces: 15,
      ingredients: "سميد، سمن بلدي، فستق حلبي، سكر بودرة، ماء ورد",
      category: "المعمول والبسكويت",
      image: "/products/maamoul/maamoul-fustok.jpg",
      sortOrder: 3,
      isFeatured: true,
      options: [
        { label: "علبة صغيرة", additionalPrice: 0 },
        { label: "علبة متوسطة", additionalPrice: 30000 },
        { label: "علبة كبيرة", additionalPrice: 60000 }
      ]
    },
    {
      name: "كرات التمر الذهبية",
      description: "كرات تمر طرية مغلفة بجوز الهند أو السمسم، مزيج مثالي من الحلاوة والصحة",
      price: 20000,
      weight: "200غ",
      pieces: 10,
      ingredients: "تمر مجهول، جوز هند مبشور، سمسم، حليب بودرة، هيل",
      category: "المعمول والبسكويت",
      image: "/products/maamoul/date-balls.jpg",
      sortOrder: 4,
      isFeatured: false,
      options: [
        { label: "علبة صغيرة", additionalPrice: 0 },
        { label: "علبة متوسطة", additionalPrice: 10000 }
      ]
    },
    {
      name: "بسكويت الليمون",
      description: "بسكويت هش بنكهة ليمون منعشة مع طبقة سكر ناعمة",
      price: 18000,
      weight: "200غ",
      pieces: 16,
      ingredients: "دقيق، زبدة، سكر، عصير ليمون، قشر ليمون، بيض، فانيلا",
      category: "المعمول والبسكويت",
      image: "/products/maamoul/lemon-cookies.jpg",
      sortOrder: 5,
      isFeatured: false,
      options: [
        { label: "علبة صغيرة", additionalPrice: 0 },
        { label: "علبة كبيرة", additionalPrice: 12000 }
      ]
    },
    {
      name: "التمرية الملكية بالطحينة",
      description: "تمرية مقلية مقرمشة محشوة بالطحينة الفاخرة، تجربة شرقية أصيلة",
      price: 22000,
      weight: "250غ",
      pieces: 14,
      ingredients: "دقيق، طحينة، سكر، نشا، زيت نباتي، سمسم",
      category: "المعمول والبسكويت",
      image: "/products/maamoul/tahini-rolls.jpg",
      sortOrder: 6,
      isFeatured: false,
      options: [
        { label: "علبة صغيرة", additionalPrice: 0 },
        { label: "علبة متوسطة", additionalPrice: 12000 }
      ]
    }
  ];

  // ============================================
  // قسم الشوكولا البلجيكية - قطع صغيرة 10غ
  // ============================================
  
  const smallChocolates = [
    {
      name: "شوكولا جوز الهند",
      description: "قطعة شوكولا بلجيكية كريمية بحشوة جوز الهند الماليزيه",
      price: 8000,
      weight: "10غ",
      pieces: 1,
      ingredients: "كاكاو، زبدة كاكاو، حليب بودرة، جوز هند مبشور، سكر",
      category: "شوكولا قطع صغيرة",
      image: "/products/chocolate/coconut.jpg",
      sortOrder: 10,
      isFeatured: true,
      options: [
        { label: "قطعة واحدة", additionalPrice: 0 },
        { label: "6 قطع", additionalPrice: 40000 },
        { label: "12 قطعة", additionalPrice: 75000 }
      ]
    },
    {
      name: "شوكولا الكراميل",
      description: "قطعة شوكولا داكنة مذابة بحشوة كراميل لذيذة تتسرب عند العض",
      price: 8000,
      weight: "10غ",
      pieces: 1,
      ingredients: "كاكاو داكن، كراميل، سكر، كريمة، ملح بحري",
      category: "شوكولا قطع صغيرة",
      image: "/products/chocolate/caramel.jpg",
      sortOrder: 11,
      isFeatured: true,
      options: [
        { label: "قطعة واحدة", additionalPrice: 0 },
        { label: "6 قطع", additionalPrice: 40000 },
        { label: "12 قطعة", additionalPrice: 75000 }
      ]
    },
    {
      name: "شوكولا البندق",
      description: "قطعة شوكولا بالحليب مع قطع البندق المحمص المفروم",
      price: 8000,
      weight: "10غ",
      pieces: 1,
      ingredients: "كاكاو، زبدة كاكاو، بندق محمص، حليب بودرة، سكر",
      category: "شوكولا قطع صغيرة",
      image: "/products/chocolate/hazelnut.jpg",
      sortOrder: 12,
      isFeatured: true,
      options: [
        { label: "قطعة واحدة", additionalPrice: 0 },
        { label: "6 قطع", additionalPrice: 40000 },
        { label: "12 قطعة", additionalPrice: 75000 }
      ]
    }
  ];

  // ============================================
  // قسم الشوكولا البلجيكية - بارات 15غ
  // ============================================
  
  const barChocolates = [
    {
      name: "بار شوكولا بالنسكافيه",
      description: "بار شوكولا بالحليب بنكهة نسكافيه مميزة مع قوام كريمي",
      price: 12000,
      weight: "15غ",
      pieces: 1,
      ingredients: "كاكاو، زبدة كاكاو، نسكافيه، حليب بودرة، سكر",
      category: "شوكولا بارات",
      image: "/products/chocolate/nescafe-bar.jpg",
      sortOrder: 20,
      isFeatured: true,
      options: [
        { label: "بار واحد", additionalPrice: 0 },
        { label: "3 بارات", additionalPrice: 30000 },
        { label: "6 بارات", additionalPrice: 55000 }
      ]
    },
    {
      name: "بار شوكولا دبي",
      description: "بار شوكولا فاخر بطعم karat gold مع لمعة ذهبية صالحة للأكل",
      price: 15000,
      weight: "15غ",
      pieces: 1,
      ingredients: "كاكاو داكن، karat gold، كريمة، سكر، ملح",
      category: "شوكولا بارات",
      image: "/products/chocolate/dubai-bar.jpg",
      sortOrder: 21,
      isFeatured: true,
      options: [
        { label: "بار واحد", additionalPrice: 0 },
        { label: "3 بارات", additionalPrice: 38000 },
        { label: "6 بارات", additionalPrice: 70000 }
      ]
    },
    {
      name: "بار شوكولا بالمكسرات",
      description: "بار شوكولا بالحليب محشو بخليط من المكسرات المشكلة (لوز، جوز، فستق، كاجو، بندق)",
      price: 14000,
      weight: "15غ",
      pieces: 1,
      ingredients: "كاكاو، زبدة كاكاو، مكسرات مشكلة، حليب بودرة، سكر",
      category: "شوكولا بارات",
      image: "/products/chocolate/nuts-bar.jpg",
      sortOrder: 22,
      isFeatured: true,
      options: [
        { label: "بار واحد", additionalPrice: 0 },
        { label: "3 بارات", additionalPrice: 35000 },
        { label: "6 بارات", additionalPrice: 65000 }
      ]
    }
  ];

  // ============================================
  // قسم الشوكولا البلجيكية - بارات كبيرة 100غ
  // ============================================
  
  const largeChocolates = [
    {
      name: "بار شوكولا داكن 100%",
      description: "شوكولا داكنة نقية 100% كاكاو، طعم قوي وغني للذواقة",
      price: 35000,
      weight: "100غ",
      pieces: 1,
      ingredients: "كاكاو صلب، زبدة كاكاو، سكر",
      category: "شوكولا كبيرة",
      image: "/products/chocolate/dark-100.jpg",
      sortOrder: 30,
      isFeatured: true,
      options: []
    },
    {
      name: "بار شوكولا بالحليب",
      description: "شوكولا بلجيكية بالحليب كريمية ومتوازنة بالحلاوة",
      price: 30000,
      weight: "100غ",
      pieces: 1,
      ingredients: "كاكاو، زبدة كاكاو، حليب بودرة، سكر",
      category: "شوكولا كبيرة",
      image: "/products/chocolate/milk-bar.jpg",
      sortOrder: 31,
      isFeatured: false,
      options: []
    },
    {
      name: "بار شوكولا بيضاء",
      description: "شوكولا بيضاء ناعمة وراقية بنكهة الفانيليا",
      price: 30000,
      weight: "100غ",
      pieces: 1,
      ingredients: "زبدة كاكاو، حليب بودرة، سكر، فانيلا",
      category: "شوكولا كبيرة",
      image: "/products/chocolate/white-bar.jpg",
      sortOrder: 32,
      isFeatured: false,
      options: []
    },
    {
      name: "بار شوكولا بالمكسرات الكبيرة",
      description: "شوكولا بالحليب محشوة بأكبر كمية من المكسرات المشكلة الفاخرة",
      price: 40000,
      weight: "100غ",
      pieces: 1,
      ingredients: "كاكاو، زبدة كاكاو، مكسرات مشكلة فاخرة، حليب بودرة",
      category: "شوكولا كبيرة",
      image: "/products/chocolate/nuts-large.jpg",
      sortOrder: 33,
      isFeatured: true,
      options: [
        { label: "بلا إضافات", additionalPrice: 0 },
        { label: "مع قلب كراميل", additionalPrice: 8000 }
      ]
    }
  ];

  // ============================================
  // بوكس شوكولا ثلاثي 40غ
  // ============================================
  
  const boxChocolates = [
    {
      name: "بوكس شوكولا ثلاثي فاخر",
      description: "صندوق أنيق يحتوي 3 قطع من أفضل أنواع الشوكولا (دارك، بالحليب، بيضاء)",
      price: 45000,
      weight: "40غ",
      pieces: 3,
      ingredients: "كاكاو، زبدة كاكاو، حليب بودرة، سكر، فانيلا",
      category: "بوكس شوكولا",
      image: "/products/chocolate/trio-box.jpg",
      sortOrder: 40,
      isFeatured: true,
      options: [
        { label: "صندوق 3 قطع", additionalPrice: 0 },
        { label: "صندوق 6 قطع", additionalPrice: 80000 },
        { label: "صندوق 9 قطع", additionalPrice: 120000 }
      ]
    }
  ];

  // ============================================
  // تشكيلة حلويات صغيرة الحجم
  // ============================================
  
  const miniSweets = [
    {
      name: "كاب كيك فاخر",
      description: "كاب كيك طري بالفانيليا أو الشوكولا مع تزيين فاخر",
      price: 12000,
      weight: "60غ",
      pieces: 1,
      ingredients: "دقيق، سكر، بيض، زبدة، حليب، فانيلا، كريمة",
      category: "حلويات صغيرة",
      image: "/products/mini/cupcake.jpg",
      sortOrder: 50,
      isFeatured: true,
      options: [
        { label: "فانيليا", additionalPrice: 0 },
        { label: "شوكولا", additionalPrice: 0 },
        { label: "أحمر velvet", additionalPrice: 2000 },
        { label: "نوتيلا", additionalPrice: 3000 }
      ]
    },
    {
      name: "تارت فواكه طازجة",
      description: "تارت ميني بقاعدة هشة وحشوة كريمة وفواكه موسمية طازجة",
      price: 15000,
      weight: "50غ",
      pieces: 1,
      ingredients: "دقيق، زبدة، كريمة باتيسيير، فراولة، كيوي، مانجو",
      category: "حلويات صغيرة",
      image: "/products/mini/tart-fruits.jpg",
      sortOrder: 51,
      isFeatured: true,
      options: [
        { label: "فواكه فقط", additionalPrice: 0 },
        { label: "شوكولا وفواكه", additionalPrice: 3000 },
        { label: "مكسرات وفواكه", additionalPrice: 3000 },
        { label: "ميكس كلشي", additionalPrice: 5000 }
      ]
    },
    {
      name: "تارت شوكولا وفواكه",
      description: "تارت ميني بقاعدة شوكولا مع طبقة فواكه طازجة",
      price: 16000,
      weight: "55غ",
      pieces: 1,
      ingredients: "كاكاو، زبدة، كريمة شوكولا، فراولة، توت أزرق",
      category: "حلويات صغيرة",
      image: "/products/mini/tart-choco-fruits.jpg",
      sortOrder: 52,
      isFeatured: false,
      options: [
        { label: "تارت واحد", additionalPrice: 0 },
        { label: "4 قطع", additionalPrice: 50000 },
        { label: "8 قطع", additionalPrice: 95000 }
      ]
    },
    {
      name: "تارت مكسرات وفواكه",
      description: "تارت ميني محشو بالمكسرات المحمصة مع طبقة فواكه",
      price: 16000,
      weight: "55غ",
      pieces: 1,
      ingredients: "دقيق، زبدة، مكسرات محمصة، كريمة، فواكه موسمية",
      category: "حلويات صغيرة",
      image: "/products/mini/tart-nuts-fruits.jpg",
      sortOrder: 53,
      isFeatured: false,
      options: [
        { label: "تارت واحد", additionalPrice: 0 },
        { label: "4 قطع", additionalPrice: 50000 }
      ]
    },
    {
      name: "تارت مكسرات وشوكولا وفواكه",
      description: "تارت ميني ميكس بكلشي - المكسرات والشوكولا والفواكه",
      price: 18000,
      weight: "60غ",
      pieces: 1,
      ingredients: "دقيق، زبدة، مكسرات، شوكولا، كريمة، فواكه موسمية",
      category: "حلويات صغيرة",
      image: "/products/mini/tart-mix.jpg",
      sortOrder: 54,
      isFeatured: true,
      options: [
        { label: "تارت واحد", additionalPrice: 0 },
        { label: "4 قطع", additionalPrice: 60000 }
      ]
    },
    {
      name: "كرات الشوكولا",
      description: "كرات شوكولا داكنة مغطاة بالكاكاو أو جوز الهند أو مكسكة بالnuts",
      price: 10000,
      weight: "30غ",
      pieces: 3,
      ingredients: "شوكولا داكنة، كريمة، زبدة، كاكاو، جوز هند",
      category: "حلويات صغيرة",
      image: "/products/mini/choco-balls.jpg",
      sortOrder: 55,
      isFeatured: true,
      options: [
        { label: "مغطاة كاكاو", additionalPrice: 0 },
        { label: "مغطاة جوز هند", additionalPrice: 0 },
        { label: "مكسكة مكسرات", additionalPrice: 3000 },
        { label: "صندوق 12 كرة", additionalPrice: 90000 }
      ]
    }
  ];

  // ============================================
  // إضافة جميع المنتجات
  // ============================================
  
  const allProducts = [
    ...maamoulProducts,
    ...smallChocolates,
    ...barChocolates,
    ...largeChocolates,
    ...boxChocolates,
    ...miniSweets
  ];

  let count = 0;
  for (const product of allProducts) {
    const { options, ...rest } = product;
    await prisma.product.create({ 
      data: { 
        ...rest, 
        options: JSON.stringify(options) 
      } 
    });
    count++;
  }

  console.log(`\n✅ تم إضافة ${count} منتج بنجاح!`);
  
  // ============================================
  // عرض الملخص
  // ============================================
  
  console.log("\n📦 ملخص المنتجات:");
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  🥐 المعمول والبسكويت: ${maamoulProducts.length} منتج`);
  console.log(`  🍫 شوكولا قطع صغيرة: ${smallChocolates.length} منتج`);
  console.log(`  📊 شوكولا بارات: ${barChocolates.length} منتج`);
  console.log(`  🍫 شوكولا كبيرة: ${largeChocolates.length} منتج`);
  console.log(`  🎁 بوكس شوكولا: ${boxChocolates.length} منتج`);
  console.log(`  🧁 حلويات صغيرة: ${miniSweets.length} منتج`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  📊 المجموع: ${count} منتج`);
  console.log(`\n🎉 تم بنجاح!`);
}

main()
  .catch((e) => {
    console.error("❌ خطأ:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
