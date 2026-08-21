import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { type Request, type Response } from "express";

import { config } from "./config";
import { auth } from "./lib/auth";
import { prisma } from "./lib/prisma";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import { notFoundHandler } from "./middlewares/notFound";
import { applicationRoutes } from "./routes";

const app = express();

// ==========================================
// 1. Core Middlewares
// ==========================================
app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// 2. Authentication Route Handler
// ==========================================
app.all("/api/auth/*splat", toNodeHandler(auth));

// ==========================================
// 3. System & Health Routes
// ==========================================
app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Welcome to the Prisma Blog App API",
  });
});

app.get("/health", async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: "connected",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// ==========================================
// 4. Application API v1 Routes
// ==========================================
app.use("/api/v1", applicationRoutes);

// ==========================================
// 5. Error & Fallback Middlewares
// ==========================================
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
