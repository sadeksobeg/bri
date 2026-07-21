import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const url = process.env.DATABASE_URL;
  
  if (url?.startsWith("libsql://") || url?.startsWith("ws://") || url?.startsWith("wss://")) {
    // Turso remote database - pass config with auth token
    const authToken = process.env.TURSO_AUTH_TOKEN;
    const config: { url: string; authToken?: string } = { url };
    if (authToken) config.authToken = authToken;
    const adapter = new PrismaLibSql(config);
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }
  
  // Local SQLite fallback
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
