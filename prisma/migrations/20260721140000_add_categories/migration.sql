-- Migration: Add new product fields and category management
-- Date: 2026-07-21

-- Add new columns to Product table
ALTER TABLE "Product" ADD COLUMN "weight" TEXT;
ALTER TABLE "Product" ADD COLUMN "pieces" INTEGER;
ALTER TABLE "Product" ADD COLUMN "ingredients" TEXT;
ALTER TABLE "Product" ADD COLUMN "wholesalePrice" REAL;
ALTER TABLE "Product" ADD COLUMN "discount" REAL DEFAULT 0;
ALTER TABLE "Product" ADD COLUMN "isFeatured" BOOLEAN DEFAULT false;

-- Create Category table
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "color" TEXT DEFAULT '#c9a961',
    "icon" TEXT,
    "sortOrder" INTEGER DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Insert default categories
INSERT INTO "Category" ("id", "name", "description", "color", "sortOrder", "isActive", "createdAt", "updatedAt")
VALUES 
    (lower(hex(randomblob(16))), 'شوكولاتة', 'تشكيلة الشوكولاتة الفاخرة', '#c9a961', 1, true, datetime('now'), datetime('now')),
    (lower(hex(randomblob(16))), 'علب', 'علب الهدايا الفاخرة', '#e8b4c8', 2, true, datetime('now'), datetime('now')),
    (lower(hex(randomblob(16))), 'هدايا', 'تجات الهدايا الخاصة', '#98d8aa', 3, true, datetime('now'), datetime('now')),
    (lower(hex(randomblob(16))), 'ترافل', 'حلوى الترافل اللذيذة', '#a8d8ea', 4, true, datetime('now'), datetime('now')),
    (lower(hex(randomblob(16))), 'كيك', 'أصناف الكيك والحلويات', '#ffd93d', 5, true, datetime('now'), datetime('now'));
