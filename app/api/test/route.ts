import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const result: any = {
    timestamp: new Date().toISOString(),
    env: {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      databaseUrlPrefix: process.env.DATABASE_URL?.substring(0, 20),
      hasTursoToken: !!process.env.TURSO_AUTH_TOKEN,
      hasCloudinary: !!(
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
      ),
    },
    prismaTest: null as any,
    productCount: null as any,
  };

  try {
    const count = await prisma.product.count();
    result.productCount = count;
    result.prismaTest = "success";
  } catch (error: any) {
    result.prismaTest = "failed";
    result.prismaError = error.message;
    result.prismaStack = error.stack?.substring(0, 500);
  }

  return NextResponse.json(result);
}