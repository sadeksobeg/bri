import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Maximum image size: 8MB
const MAX_SIZE = 8 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "لم يتم اختيار ملف" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "نوع الملف غير مسموح (PNG, JPG, WEBP, GIF)" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "حجم الملف كبير جداً (الحد الأقصى 8MB)" }, { status: 400 });
    }

    // Convert to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    
    // Create data URL
    const dataUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({ 
      url: dataUrl,
      size: buffer.length,
      type: file.type 
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "فشل رفع الملف" }, { status: 500 });
  }
}
