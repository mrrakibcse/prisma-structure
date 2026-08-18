import { Router } from "express";
import { PostController } from "./post.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", PostController.getAllPosts);
router.get("/:slug", PostController.getPostBySlug);

// Protected Routes
router.post("/", requireAuth, PostController.createPost);
router.patch("/:id", requireAuth, PostController.updatePost);
router.delete("/:id", requireAuth, PostController.deletePost);

export const postRoutes = router;
