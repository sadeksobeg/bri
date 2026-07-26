import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Run raw SQL to create all tables
    // Add missing columns if they don't exist (for older databases)
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "Product" ADD COLUMN "isBestSeller" INTEGER NOT NULL DEFAULT 0`);
    } catch (e) {
      // Column may already exist, ignore error
    }
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "Product" ADD COLUMN "isNew" INTEGER NOT NULL DEFAULT 0`);
    } catch (e) {
      // Column may already exist, ignore error
    }

    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "Product" ADD COLUMN "ingredients" TEXT`);
    } catch (e) {
      // Column may already exist, ignore error
    }
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "Product" ADD COLUMN "wholesalePrice" REAL`);
    } catch (e) {
      // Column may already exist, ignore error
    }
    try {
      await prisma.$executeRawUnsafe(`ALTER TABLE "Product" ADD COLUMN "discount" REAL NOT NULL DEFAULT 0`);
    } catch (e) {
      // Column may already exist, ignore error
    }

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Product" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "description" TEXT NOT NULL,
        "price" INTEGER NOT NULL,
        "weight" TEXT,
        "pieces" INTEGER,
        "category" TEXT NOT NULL,
        "image" TEXT NOT NULL,
        "isFeatured" INTEGER NOT NULL DEFAULT 0,
        "isActive" INTEGER NOT NULL DEFAULT 1,
        "sortOrder" INTEGER NOT NULL DEFAULT 0,
        "options" TEXT NOT NULL DEFAULT '[]',
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Category" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "icon" TEXT,
        "sortOrder" INTEGER NOT NULL DEFAULT 0,
        "isActive" INTEGER NOT NULL DEFAULT 1,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Order" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "orderNumber" TEXT NOT NULL UNIQUE,
        "customerName" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "address" TEXT,
        "notes" TEXT,
        "subtotal" INTEGER NOT NULL,
        "total" INTEGER NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'pending',
        "items" TEXT NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Admin" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "username" TEXT NOT NULL UNIQUE,
        "password" TEXT NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Session" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "adminId" TEXT NOT NULL,
        "token" TEXT NOT NULL UNIQUE,
        "expiresAt" DATETIME NOT NULL,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Delete existing products
    await prisma.$executeRawUnsafe(`DELETE FROM "Product"`);

    const products = [
      { name: "برازق", description: "برازق ذهبي هش ومقرمش بطعم لا يُقاوم", price: 25000, weight: "250غ", pieces: 12, category: "المعمول والبسكويت", image: "/products/placeholder.jpg", sortOrder: 1, isFeatured: 1, options: "[]" },
      { name: "معمول الجوز", description: "معمول ذهبي طري ومفتت بحشوة جوز طبيعية", price: 35000, weight: "300غ", pieces: 15, category: "المعمول والبسكويت", image: "/products/placeholder.jpg", sortOrder: 2, isFeatured: 1, options: "[]" },
      { name: "معمول الفستق الحلبي", description: "معمول فاخر بحشوة فستق حلبي أصيل", price: 55000, weight: "300غ", pieces: 15, category: "المعمول والبسكويت", image: "/products/placeholder.jpg", sortOrder: 3, isFeatured: 1, options: "[]" },
      { name: "كرات التمر الذهبية", description: "كرات تمر طرية بمذاق استثنائي", price: 20000, weight: "200غ", pieces: 10, category: "المعمول والبسكويت", image: "/products/placeholder.jpg", sortOrder: 4, isFeatured: 0, options: "[]" },
      { name: "بسكويت الليمون", description: "بسكويت هش بنكهة ليمون منعشة", price: 18000, weight: "200غ", pieces: 16, category: "المعمول والبسكويت", image: "/products/placeholder.jpg", sortOrder: 5, isFeatured: 0, options: "[]" },
      { name: "التمرية الملكية بالطحينة", description: "تمرية مقلية مقرمشة محشوة بالطحينة الفاخرة", price: 22000, weight: "250غ", pieces: 14, category: "المعمول والبسكويت", image: "/products/placeholder.jpg", sortOrder: 6, isFeatured: 0, options: "[]" },
      { name: "شوكولا جوز الهند (كوكونيست)", description: "قطعة شوكولا بلجيكية بحشوة جوز الهند", price: 8000, weight: "10غ", pieces: 1, category: "شوكولا قطع صغيرة", image: "/products/placeholder.jpg", sortOrder: 10, isFeatured: 1, options: "[]" },
      { name: "شوكولا الكراميل", description: "قطعة شوكولا داكنة بحشوة كراميل", price: 8000, weight: "10غ", pieces: 1, category: "شوكولا قطع صغيرة", image: "/products/placeholder.jpg", sortOrder: 11, isFeatured: 1, options: "[]" },
      { name: "شوكولا البندق", description: "قطعة شوكولا بالحليب مع البندق المحمص", price: 8000, weight: "10غ", pieces: 1, category: "شوكولا قطع صغيرة", image: "/products/placeholder.jpg", sortOrder: 12, isFeatured: 1, options: "[]" },
      { name: "بار شوكولا بحشوة النسكافيه", description: "بار شوكولا بنكهة النسكافيه المميزة", price: 12000, weight: "15غ", pieces: 1, category: "شوكولا بارات", image: "/products/placeholder.jpg", sortOrder: 20, isFeatured: 1, options: "[]" },
      { name: "بار شوكولا دبي", description: "بار شوكولا فاخر بطعم مميز", price: 15000, weight: "15غ", pieces: 1, category: "شوكولا بارات", image: "/products/placeholder.jpg", sortOrder: 21, isFeatured: 1, options: "[]" },
      { name: "بار شوكولا بالمكسرات", description: "بار شوكولا محشو بالمكسرات المشكلة (لوز، جوز، فستق، كاجو، بندق، فستق حلبي)", price: 14000, weight: "15غ", pieces: 1, category: "شوكولا بارات", image: "/products/placeholder.jpg", sortOrder: 22, isFeatured: 1, options: "[]" },
      { name: "بار شوكولا داكن", description: "شوكولا داكنة نقية 100%", price: 35000, weight: "100غ", pieces: 1, category: "شوكولا كبيرة", image: "/products/placeholder.jpg", sortOrder: 30, isFeatured: 1, options: "[]" },
      { name: "بار شوكولا حلوة", description: "شوكولا بلجيكية بالحليب كريمية", price: 30000, weight: "100غ", pieces: 1, category: "شوكولا كبيرة", image: "/products/placeholder.jpg", sortOrder: 31, isFeatured: 0, options: "[]" },
      { name: "بار شوكولا بيضاء", description: "شوكولا بيضاء ناعمة وراقية", price: 30000, weight: "100غ", pieces: 1, category: "شوكولا كبيرة", image: "/products/placeholder.jpg", sortOrder: 32, isFeatured: 0, options: "[]" },
      { name: "بار شوكولا بالمكسرات", description: "شوكولا بالحليب محشوة بالمكسرات المشكلة الفاخرة", price: 40000, weight: "100غ", pieces: 1, category: "شوكولا كبيرة", image: "/products/placeholder.jpg", sortOrder: 33, isFeatured: 1, options: "[]" },
      { name: "بوكس شوكولا ثلاثي", description: "صندوق أنيق يحتوي 3 قطع (دارك، حلوة، بيضاء)", price: 45000, weight: "40غ", pieces: 3, category: "بوكس شوكولا", image: "/products/placeholder.jpg", sortOrder: 40, isFeatured: 1, options: "[]" },
      { name: "كاب كيك", description: "كاب كيك طري مع تزيين فاخر", price: 12000, weight: "60غ", pieces: 1, category: "حلويات صغيرة", image: "/products/placeholder.jpg", sortOrder: 50, isFeatured: 1, options: "[]" },
      { name: "تارت فواكه", description: "تارت بقاعدة هشة وحشوة فواكه موسمية طازجة", price: 15000, weight: "50غ", pieces: 1, category: "حلويات صغيرة", image: "/products/placeholder.jpg", sortOrder: 51, isFeatured: 1, options: "[]" },
      { name: "تارت شوكولا وفواكه", description: "تارت بقاعدة شوكولا مع طبقة فواكه طازجة", price: 16000, weight: "55غ", pieces: 1, category: "حلويات صغيرة", image: "/products/placeholder.jpg", sortOrder: 52, isFeatured: 0, options: "[]" },
      { name: "تارت مكسرات وفواكه", description: "تارت محشو بالمكسرات المحمصة مع طبقة فواكه", price: 16000, weight: "55غ", pieces: 1, category: "حلويات صغيرة", image: "/products/placeholder.jpg", sortOrder: 53, isFeatured: 0, options: "[]" },
      { name: "تارت مكسرات وشوكولا وفواكه", description: "تارت ميكس - المكسرات والشوكولا والفواكه", price: 18000, weight: "60غ", pieces: 1, category: "حلويات صغيرة", image: "/products/placeholder.jpg", sortOrder: 54, isFeatured: 1, options: "[]" },
      { name: "كرات الشوكولا", description: "كرات شوكولا داكنة مغطاة", price: 10000, weight: "30غ", pieces: 3, category: "حلويات صغيرة", image: "/products/placeholder.jpg", sortOrder: 55, isFeatured: 1, options: "[]" },
    ];

    let count = 0;
    for (const p of products) {
      await prisma.$executeRawUnsafe(
        `INSERT INTO "Product" ("id", "name", "description", "price", "weight", "pieces", "category", "image", "isFeatured", "isActive", "sortOrder", "options", "createdAt", "updatedAt") VALUES (lower(hex(randomblob(16))), ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, datetime('now'), datetime('now'))`,
        [p.name, p.description, p.price, p.weight || null, p.pieces || null, p.category, p.image, p.isFeatured, p.sortOrder, p.options]
      );
      count++;
    }

    return NextResponse.json({
      success: true,
      message: `تم انشاء الجداول واضافة ${count} منتج بنجاح`,
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
