import { Router } from "express";
import { postRoutes } from "../modules/post/post.routes.js";
import { commentRoutes } from "../modules/comment/comment.routes.js";
const router = Router();
const moduleRoutes = [
    {
        path: "/posts",
        route: postRoutes,
    },
    {
        path: "/comments",
        route: commentRoutes,
    },
];
moduleRoutes.forEach((item) => {
    router.use(item.path, item.route);
});
export const applicationRoutes = router;
//# sourceMappingURL=index.js.map