import app from "./app.js";
import { prisma } from "./lib/prisma.js";
const PORT = process.env.PORT || 7000;
const startServer = async () => {
    try {
        // Test database connectivity before accepting HTTP traffic
        await prisma.$connect();
        console.log("✅ Database connected successfully.");
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
        // Graceful Shutdown Logic with Error Handling
        const shutdown = async (signal) => {
            console.log(`\nReceived ${signal}. Shutting down gracefully...`);
            try {
                server.close(async () => {
                    await prisma.$disconnect();
                    console.log("🔌 Database disconnected. Server closed cleanly.");
                    process.exit(0);
                });
            }
            catch (error) {
                console.error("❌ Error during server shutdown:", error);
                process.exit(1);
            }
        };
        process.on("SIGINT", () => shutdown("SIGINT"));
        process.on("SIGTERM", () => shutdown("SIGTERM"));
    }
    catch (error) {
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
//# sourceMappingURL=server.js.map