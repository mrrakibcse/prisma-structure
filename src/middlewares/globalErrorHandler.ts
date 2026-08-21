
import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import { config } from "../config";

export const globalErrorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("💥 Global Error Handler caught:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(config.env === "development" && { stack: err.stack }),
  });
};

