import express, { type Request, type Response } from "express";
import cors from "cors";
import { config } from "./config";
import { prisma } from "./lib/prisma";
import { applicationRoutes } from "./routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();

// Middlewares
app.use(cors({
  origin: config.clientUrl,
  credentials: true, // Required for sending cookies/sessions
}));
app.use(express.json());

// 1. Mount Better-Auth Route Handler (Handles all /api/auth/* routes)
app.all("/api/auth/*splat", toNodeHandler(auth));

// Root Route
app.get("/", (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Welcome to the Prisma Blog App API",
  });
});

// Health Check Route
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

// Application API v1 Routes
app.use("/api/v1", applicationRoutes);

// Manual 404 Route Not Found Fallback
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' not found`,
  });
});

export default app;
