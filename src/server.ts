import app from "./app";
import { config } from "./config";
import { prisma } from "./lib/prisma";

const PORT = config.port;

const startServer = async () => {
  try {
    // Test database connectivity before accepting HTTP traffic
    await prisma.$connect();
    console.log("✅ Database connected successfully.");

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

    // Graceful Shutdown Logic with Error Handling
    const shutdown = async (signal: string) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);

  try {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });

    await prisma.$disconnect();

    console.log("🔌 Database disconnected. Server closed cleanly.");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error during server shutdown:", error);

    await prisma.$disconnect();

    process.exit(1);
  }
};

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

  } catch (error) {
    console.error("❌ Failed to initialize server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

// Global Uncaught Exception & Rejection Handlers
process.on("uncaughtException", (error) => {
  console.error("💥 Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("💥 Unhandled Rejection:", reason);
  process.exit(1);
});

startServer();
