import {} from "express";
import { ApiError } from "./ApiError.js";
export const globalErrorHandler = (err, _req, res, _next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let errorSources = [];
    // Prisma Error Handling
    if (err?.code) {
        switch (err.code) {
            case "P2002": {
                statusCode = 409;
                const target = err.meta?.target ? (Array.isArray(err.meta.target) ? err.meta.target.join(", ") : err.meta.target) : "field";
                message = `Duplicate value entered for ${target}. Must be unique.`;
                errorSources.push({
                    path: String(target),
                    message: `Unique constraint failed on ${target}`,
                });
                break;
            }
            case "P2025": {
                statusCode = 404;
                message = err.meta?.cause || "Requested record was not found.";
                errorSources.push({
                    path: "id",
                    message,
                });
                break;
            }
            case "P2003": {
                statusCode = 400;
                message = "Foreign key constraint failed.";
                errorSources.push({
                    path: err.meta?.field_name || "foreign_key",
                    message: "Referenced entity does not exist.",
                });
                break;
            }
            default: {
                statusCode = 400;
                message = err.message || "Database query error.";
            }
        }
    }
    else if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
        errorSources.push({
            path: "",
            message: err.message,
        });
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSources.push({
            path: "",
            message: err.message,
        });
    }
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errorSources: errorSources.length > 0 ? errorSources : undefined,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
};
//# sourceMappingURL=globalErrorHandler.js.map