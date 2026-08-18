import { Router } from "express";
import { CommentController } from "./comment.controller";
import { requireAuth, requireRole } from "../../middlewares/auth.middleware";
import { UserRole } from "../../generated/prisma/client";

const router = Router();

// Public route
router.get("/post/:postId", CommentController.getCommentsByPost);

// Protected routes
router.post("/", requireAuth, CommentController.createComment);
router.patch("/:id/status", requireAuth, requireRole(UserRole.ADMIN, UserRole.EDITOR), CommentController.updateCommentStatus);
router.delete("/:id", requireAuth, CommentController.deleteComment);

export const commentRoutes = router;
