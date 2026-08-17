import { Router } from "express";
import { PostController } from "./post.controller.js";
const router = Router();
router.get("/", PostController.getAllPosts);
router.post("/", PostController.createPost);
router.get("/:slug", PostController.getPostBySlug);
router.patch("/:id", PostController.updatePost);
router.delete("/:id", PostController.deletePost);
export const postRoutes = router;
//# sourceMappingURL=post.routes.js.map