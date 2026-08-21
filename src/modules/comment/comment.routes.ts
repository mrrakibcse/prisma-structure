import { Router } from "express";

import { UserRole } from "../../generated/prisma/client";
import { requireAuth, requireRole } from "../../middlewares/auth.middleware";
import { CommentController } from "./comment.controller";

const router = Router();

// Public route
router.get("/post/:postId", CommentController.getCommentsByPost);

// Protected routes
router.post("/", requireAuth, CommentController.createComment);
router.patch("/:id/status", requireAuth, requireRole(UserRole.ADMIN, UserRole.EDITOR), CommentController.updateCommentStatus);
router.delete("/:id", requireAuth, CommentController.deleteComment);

export const commentRoutes = router;
