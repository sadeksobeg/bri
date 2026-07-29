import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "لم يتم رفع أي ملف" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "نوع الملف غير مسموح. الأنواع المسموحة: JPG, PNG, WEBP" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "حجم الملف كبير جداً. الحد الأقصى المسموح: 8MB" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `products/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

    // Upload to Vercel Blob
    const blob = await put(fileName, file, {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({
      path: blob.url,
      fileName: blob.pathname,
      width: 0,
      height: 0,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء رفع الملف" },
      { status: 500 }
    );
  }
}
