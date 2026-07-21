import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: "شوكولاتة الحليب الفاخرة",
    description:
      "شوكولاتة حليب كريمية مصنوعة يدوياً من أجود حبوب الكاكاو، مغلفة بتغليف أنيق بريڤيا.",
    price: 45000,
    image: "/brand/packaging.png",
    category: "شوكولاتة",
    options: JSON.stringify([
      { name: "الحجم", values: ["100غ", "250غ", "500غ"] },
      { name: "النكهة", values: ["حليب", "بندق", "فانيلا"] },
    ]),
    isActive: true,
    sortOrder: 1,
  },
  {
    name: "علبة الهدايا الفاخرة",
    description:
      "علبة مربعة بتصميم damask كلاسيكي، تحتوي على تشكيلة مختارة من الشوكولاتة الحرفية.",
    price: 185000,
    image: "/brand/packaging.png",
    category: "علب",
    options: JSON.stringify([
      { name: "المحتوى", values: ["12 قطعة", "24 قطعة", "36 قطعة"] },
      { name: "التغليف", values: ["كلاسيك", "ذهبي"] },
    ]),
    isActive: true,
    sortOrder: 2,
  },
  {
    name: "ترافل الشوكولاتة الداكنة",
    description:
      "ترافل داكنة غنية بنسبة 70% كاكاو، مغطاة بمسحوق الكاكاو الفاخر.",
    price: 75000,
    image: "/brand/packaging.png",
    category: "ترافل",
    options: JSON.stringify([
      { name: "الكمية", values: ["6 حبات", "12 حبة", "24 حبة"] },
    ]),
    isActive: true,
    sortOrder: 3,
  },
  {
    name: "مجموعة الهدايا الملكية",
    description:
      "تشكيلة فاخرة من الشوكولاتة والحلويات في علبة هدايا ملكية — مثالية للمناسبات الخاصة.",
    price: 320000,
    image: "/brand/packaging.png",
    category: "هدايا",
    options: JSON.stringify([
      { name: "الحجم", values: ["صغير", "متوسط", "كبير"] },
      { name: "البطاقة", values: ["بدون بطاقة", "بطاقة تهنئة"] },
    ]),
    isActive: true,
    sortOrder: 4,
  },
  {
    name: "شوكولاتة داكنة 85%",
    description:
      "شوكولاتة داكنة intense بنسبة 85% كاكاو — للمحبين الذين يقدّرون النكهة الأصيلة.",
    price: 52000,
    image: "/brand/packaging.png",
    category: "شوكولاتة",
    options: JSON.stringify([
      { name: "الحجم", values: ["100غ", "200غ"] },
    ]),
    isActive: true,
    sortOrder: 5,
  },
];

async function main() {
  await prisma.product.deleteMany();

  for (const product of sampleProducts) {
    await prisma.product.create({ data: product });
  }

  console.log(`Seeded ${sampleProducts.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
