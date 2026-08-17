import { prisma } from "../../lib/prisma.js";
import {} from "./comment.interface.js";
import { ApiError } from "../../errors/ApiError.js";
export const CommentService = {
    createComment: async (payload) => {
        // Verify post exists
        const postExists = await prisma.post.findUnique({ where: { id: payload.postId } });
        if (!postExists) {
            throw new ApiError(404, `Target post with ID '${payload.postId}' not found.`);
        }
        // If parentId provided, verify parent comment exists
        if (payload.parentId) {
            const parentComment = await prisma.comment.findUnique({ where: { id: payload.parentId } });
            if (!parentComment) {
                throw new ApiError(404, `Parent comment with ID '${payload.parentId}' not found.`);
            }
        }
        return await prisma.comment.create({
            data: payload,
        });
    },
    getCommentsByPost: async (postId) => {
        return await prisma.comment.findMany({
            where: { postId, parentId: null },
            include: {
                replies: {
                    orderBy: { createdAt: "asc" },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    },
    updateCommentStatus: async (id, payload) => {
        const commentExists = await prisma.comment.findUnique({ where: { id } });
        if (!commentExists) {
            throw new ApiError(404, `Comment with ID '${id}' not found.`);
        }
        return await prisma.comment.update({
            where: { id },
            data: { status: payload.status },
        });
    },
    deleteComment: async (id) => {
        const commentExists = await prisma.comment.findUnique({ where: { id } });
        if (!commentExists) {
            throw new ApiError(404, `Comment with ID '${id}' not found.`);
        }
        return await prisma.comment.delete({
            where: { id },
        });
    },
};
//# sourceMappingURL=comment.service.js.map