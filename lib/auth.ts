import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "brivia_admin_session";
const SALT_ROUNDS = 12;

function getSecretKey(): Uint8Array {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SECRET environment variable is not set. This is required for production.");
  }
  if (secret.length < 32) {
    throw new Error("ADMIN_SECRET must be at least 32 characters long.");
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(): Promise<string> {
  const secret = getSecretKey();
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
  
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(secret);
  
  return token;
}

export async function verifySession(token: string): Promise<boolean> {
  try {
    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    
    if (!payload.exp) return false;
    if (Math.floor(Date.now() / 1000) > payload.exp) return false;
    
    return true;
  } catch {
    return false;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySession(token);
}

export function getSessionCookieName() {
  return COOKIE_NAME;
}

export async function checkPassword(password: string): Promise<boolean> {
  const hashedPassword = process.env.ADMIN_PASSWORD_HASH;
  if (!hashedPassword) {
    // Fallback for development - check plain password (remove in production!)
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) return false;
    return password === adminPassword;
  }
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch {
    return false;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}
