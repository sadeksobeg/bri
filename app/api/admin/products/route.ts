import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

// Fallback placeholder
const DEFAULT_IMAGE = "/brand/packaging.png";

async function uploadToCloudinary(file: File): Promise<string> {
  if (!cloudName || !apiKey || !apiSecret) {
    console.warn("Cloudinary not configured, using default image");
    return DEFAULT_IMAGE;
  }
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const dataUri = `data:${file.type};base64,${base64}`;

  try {
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "brivia/products",
      resource_type: "image",
      transformation: [
        { width: 800, height: 800, crop: "limit" },
        { quality: "auto", fetch_format: "auto" },
      ],
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return DEFAULT_IMAGE;
  }
}

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(products.map((p) => ({
      ...p,
      isBestSeller: p.isBestSeller ?? false,
      isNew: p.isNew ?? false,
    })));
  } catch (error) {
    console.error("GET /api/admin/products:", error);
    return NextResponse.json({ error: "فشل جلب المنتجات" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = String(formData.get("name") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const priceStr = String(formData.get("price") || "");
    const price = priceStr ? parseFloat(priceStr) : null;
    const weight = String(formData.get("weight") || "").trim() || null;
    const piecesStr = String(formData.get("pieces") || "");
    const pieces = piecesStr ? parseInt(piecesStr, 10) : null;
    const ingredients = String(formData.get("ingredients") || "").trim() || null;
    const wholesalePriceStr = String(formData.get("wholesalePrice") || "");
    const wholesalePrice = wholesalePriceStr ? parseFloat(wholesalePriceStr) : null;
    const discountStr = String(formData.get("discount") || "0");
    const discount = discountStr ? parseFloat(discountStr) : 0;
    const category = String(formData.get("category") || "").trim();
    const options = String(formData.get("options") || "[]");
    const isActive = formData.get("isActive") !== "false";
    const isFeatured = formData.get("isFeatured") === "true";
    const isBestSeller = formData.get("isBestSeller") === "true";
    const isNew = formData.get("isNew") === "true";
    const sortOrderStr = String(formData.get("sortOrder") || "0");
    const sortOrder = sortOrderStr ? parseInt(sortOrderStr, 10) : 0;
    const imageFile = formData.get("image") as File | null;
    const existingImage = String(formData.get("existingImage") || "");

    // Validate
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "اسم المنتج مطلوب" }, { status: 400 });
    }
    if (!description || description.length < 10) {
      return NextResponse.json({ error: "الوصف مطلوب" }, { status: 400 });
    }
    if (!category) {
      return NextResponse.json({ error: "التصنيف مطلوب" }, { status: 400 });
    }

    // Handle image
    let image = DEFAULT_IMAGE;
    if (imageFile && imageFile.size > 0) {
      image = await uploadToCloudinary(imageFile);
    } else if (existingImage) {
      image = existingImage;
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        weight,
        pieces,
        ingredients,
        wholesalePrice,
        discount,
        category,
        options,
        isActive,
        isFeatured,
        isBestSeller,
        isNew,
        image,
        sortOrder,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/products:", error);
    return NextResponse.json({ error: "فشل إضافة المنتج" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = String(formData.get("id") || "").trim();

    if (!id) {
      return NextResponse.json({ error: "معرف المنتج مطلوب" }, { status: 400 });
    }

    // Get existing
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }

    const name = String(formData.get("name") || "").trim() || existing.name;
    const description = String(formData.get("description") || "").trim() || existing.description;
    const priceStr = String(formData.get("price") || "");
    const price = priceStr ? parseFloat(priceStr) : existing.price;
    const weight = String(formData.get("weight") || "").trim() || existing.weight;
    const piecesStr = String(formData.get("pieces") || "");
    const pieces = piecesStr ? parseInt(piecesStr, 10) : existing.pieces;
    const ingredients = String(formData.get("ingredients") || "").trim() || existing.ingredients;
    const wholesalePriceStr = String(formData.get("wholesalePrice") || "");
    const wholesalePrice = wholesalePriceStr ? parseFloat(wholesalePriceStr) : existing.wholesalePrice;
    const discountStr = String(formData.get("discount") || "0");
    const discount = discountStr ? parseFloat(discountStr) : 0;
    const category = String(formData.get("category") || "").trim() || existing.category;
    const options = String(formData.get("options") || "") || existing.options;
    const isActive = formData.get("isActive") !== "false";
    const isFeatured = formData.get("isFeatured") === "true";
    const isBestSeller = formData.get("isBestSeller") === "true";
    const isNew = formData.get("isNew") === "true";
    const sortOrderStr = String(formData.get("sortOrder") || "0");
    const sortOrder = sortOrderStr ? parseInt(sortOrderStr, 10) : 0;
    const imageFile = formData.get("image") as File | null;
    const existingImage = String(formData.get("existingImage") || "");

    // Handle image
    let image = existing.image;
    if (imageFile && imageFile.size > 0) {
      image = await uploadToCloudinary(imageFile);
    } else if (existingImage) {
      image = existingImage;
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        weight,
        pieces,
        ingredients,
        wholesalePrice,
        discount,
        category,
        options,
        isActive,
        isFeatured,
        isBestSeller,
        isNew,
        image,
        sortOrder,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("PUT /api/admin/products:", error);
    return NextResponse.json({ error: "فشل تحديث المنتج" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "معرف المنتج مطلوب" }, { status: 400 });
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/products:", error);
    return NextResponse.json({ error: "فشل حذف المنتج" }, { status: 500 });
  }
}
