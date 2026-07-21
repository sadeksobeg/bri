import { NextRequest, NextResponse } from "next/server";
import { checkPassword, createSession, getSessionCookieName } from "@/lib/auth";

// Simple in-memory rate limiter (resets on cold starts - suitable for Netlify)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up expired entries
  if (record && now > record.resetTime) {
    rateLimitMap.delete(ip);
  }

  const current = rateLimitMap.get(ip);

  if (!current) {
    return { allowed: true, remaining: MAX_ATTEMPTS, resetIn: RATE_LIMIT_WINDOW };
  }

  if (now > current.resetTime) {
    // Reset window
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1, resetIn: RATE_LIMIT_WINDOW };
  }

  if (current.count >= MAX_ATTEMPTS) {
    const resetIn = current.resetTime - now;
    return { allowed: false, remaining: 0, resetIn };
  }

  current.count++;
  return { allowed: true, remaining: MAX_ATTEMPTS - current.count, resetIn: current.resetTime - now };
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    const rateLimit = checkRateLimit(clientIP);

    if (!rateLimit.allowed) {
      const minutes = Math.ceil(rateLimit.resetIn / 60000);
      return NextResponse.json(
        { 
          error: `تم تجاوز عدد المحاولات. حاول مجدداً بعد ${minutes} دقيقة`,
          retryAfter: Math.ceil(rateLimit.resetIn / 1000),
        },
        { 
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rateLimit.resetIn / 1000)),
            "X-RateLimit-Limit": String(MAX_ATTEMPTS),
            "X-RateLimit-Remaining": "0",
          }
        }
      );
    }

    const body = await request.json();
    const password = typeof body.password === "string" ? body.password : "";

    if (!await checkPassword(password)) {
      return NextResponse.json(
        { 
          error: "كلمة المرور غير صحيحة",
          attemptsRemaining: rateLimit.remaining,
        },
        { 
          status: 401,
          headers: {
            "X-RateLimit-Limit": String(MAX_ATTEMPTS),
            "X-RateLimit-Remaining": String(rateLimit.remaining),
          }
        }
      );
    }

    const token = await createSession();
    const response = NextResponse.json({ success: true });
    
    // Clear rate limit on successful login
    rateLimitMap.delete(clientIP);

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
