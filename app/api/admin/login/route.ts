import { NextRequest, NextResponse } from "next/server";
import { checkPassword, createSession, getSessionCookieName } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const password = typeof body.password === "string" ? body.password : "";

    if (!await checkPassword(password)) {
      return NextResponse.json({ error: "كلمة المرور غير صحيحة" }, { status: 401 });
    }

    const token = await createSession();
    const response = NextResponse.json({ success: true });
    response.cookies.set(getSessionCookieName(), token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error) {
    console.error("POST /api/admin/login:", error);
    return NextResponse.json({ error: "خطأ في تسجيل الدخول" }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(getSessionCookieName(), "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
}
