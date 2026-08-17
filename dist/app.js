import express, {} from "express";
import cors from "cors";
import "dotenv/config";
import { prisma } from "./lib/prisma.js";
import { applicationRoutes } from "./routes/index.js";
import { notFoundHandler } from "./errors/notFoundHandler.js";
import { globalErrorHandler } from "./errors/globalErrorHandler.js";
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
// Health Check Route
app.get("/health", async (_req, res) => {
    try {
        await prisma.$queryRaw `SELECT 1`;
        res.json({
            status: "ok",
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            database: "connected",
        });
    }
    catch (error) {
        res.status(500).json({
            status: "error",
            message: "Database connection failed",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
// Application API v1 Routes
app.use("/api/v1", applicationRoutes);
// 404 Route Not Found Middleware
app.use(notFoundHandler);
// Central Global Error Handler
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map