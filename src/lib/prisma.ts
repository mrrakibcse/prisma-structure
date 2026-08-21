import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { config } from "../config";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const pool = new pg.Pool({ connectionString: config.databaseUrl });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: config.env === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (config.env !== "production") globalForPrisma.prisma = prisma;
