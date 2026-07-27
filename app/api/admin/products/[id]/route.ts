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
    // No Cloudinary - return a data URL or default
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

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    
    // Get existing product first
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }

    const formData = await request.formData();
    
    // Parse all fields with safe defaults
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

    // Handle image - priority: new file > existingImage > current image > default
    let image = existing.image;
    if (imageFile && imageFile.size > 0) {
      image = await uploadToCloudinary(imageFile);
    } else if (existingImage) {
      image = existingImage;
    }

    // Validate
    if (!name || name.length < 2) {
      return NextResponse.json({ error: "اسم المنتج مطلوب" }, { status: 400 });
    }
    if (!description || description.length < 10) {
      return NextResponse.json({ error: "الوصف مطلوب" }, { status: 400 });
    }

    // Update
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        weight,
        pieces: Number.isNaN(pieces) ? existing.pieces : pieces,
        ingredients,
        wholesalePrice: Number.isNaN(wholesalePrice) ? existing.wholesalePrice : wholesalePrice,
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
    console.error("PUT /api/admin/products/[id]:", error);
    return NextResponse.json({ error: "فشل تحديث المنتج" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "المنتج غير موجود" }, { status: 404 });
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/products/[id]:", error);
    return NextResponse.json({ error: "فشل حذف المنتج" }, { status: 500 });
  }
}
