import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    // Handle JSON with base64 (preferred - bypasses Netlify body limits)
    if (contentType.includes("application/json")) {
      const body = await request.json();
      const { base64, mimeType, name } = body;

      if (!base64) {
        return NextResponse.json({ error: "لم يتم إرسال بيانات الصورة" }, { status: 400 });
      }

      if (!ALLOWED_TYPES.includes(mimeType)) {
        return NextResponse.json(
          { error: "نوع الملف غير مسموح" },
          { status: 400 }
        );
      }

      // Decode base64 to buffer
      const buffer = Buffer.from(base64, "base64");

      if (buffer.length > MAX_SIZE) {
        return NextResponse.json(
          { error: "حجم الملف كبير جداً (الحد الأقصى 8MB)" },
          { status: 400 }
        );
      }

      const ext = name ? name.split(".").pop() : mimeType.split("/")[1] || "jpg";
      const fileName = `products/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

      const { data, error } = await supabaseAdmin.storage
        .from("products")
        .upload(fileName, buffer, {
          contentType: mimeType,
          upsert: true,
        });

      if (error) {
        console.error("Supabase storage error:", error);
        return NextResponse.json({ error: "فشل رفع الملف" }, { status: 500 });
      }

      const { data: urlData } = supabaseAdmin.storage
        .from("products")
        .getPublicUrl(fileName);

      return NextResponse.json({
        path: urlData.publicUrl,
        fileName: fileName,
        width: 0,
        height: 0,
      });
    }

    // Handle FormData (legacy)
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "لم يتم رفع أي ملف" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "نوع الملف غير مسموح. الأنواع المسموحة: JPG, PNG, WEBP, GIF" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "حجم الملف كبير جداً. الحد الأقصى المسموح: 8MB" },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `products/${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await supabaseAdmin.storage
      .from("products")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error("Supabase storage error:", error);
      return NextResponse.json({ error: "فشل رفع الملف" }, { status: 500 });
    }

    const { data: urlData } = supabaseAdmin.storage
      .from("products")
      .getPublicUrl(fileName);

    return NextResponse.json({
      path: urlData.publicUrl,
      fileName: fileName,
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
