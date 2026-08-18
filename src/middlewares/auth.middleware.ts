import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import { UserRole } from "../generated/prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: typeof auth.$Infer.Session.user & { role?: UserRole };
      session?: typeof auth.$Infer.Session.session;
    }
  }
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or missing session token",
      });
      return;
    }

    req.user = session.user as typeof auth.$Infer.Session.user & { role?: UserRole };
    req.session = session.session;
    next();
  } catch (error) {
    console.error("[authMiddleware Error]:", error);
    res.status(500).json({
      success: false,
      message: "Authentication verification failed",
    });
  }
};

export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized: User not authenticated",
      });
      return;
    }

    const userRole = req.user.role || UserRole.USER;

    if (!allowedRoles.includes(userRole as UserRole)) {
      res.status(403).json({
        success: false,
        message: `Forbidden: Requires one of [${allowedRoles.join(", ")}] roles`,
      });
      return;
    }

    next();
  };
};
