import { Router } from "express";
import { CommentController } from "./comment.controller.js";

const router = Router();

router.post("/", CommentController.createComment);
router.get("/post/:postId", CommentController.getCommentsByPost);
router.patch("/:id/status", CommentController.updateCommentStatus);
router.delete("/:id", CommentController.deleteComment);

export const commentRoutes = router;
