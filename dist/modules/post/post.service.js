import { prisma } from "../../lib/prisma.js";
import {} from "./post.interface.js";
import { ApiError } from "../../errors/ApiError.js";
export const PostService = {
    createPost: async (payload) => {
        const existingSlug = await prisma.post.findUnique({
            where: { slug: payload.slug },
        });
        if (existingSlug) {
            throw new ApiError(409, `Post with slug '${payload.slug}' already exists.`);
        }
        return await prisma.post.create({
            data: payload,
        });
    },
    getAllPosts: async (filters) => {
        const { searchTerm, status, isFeatured, authorId, tag } = filters;
        const where = {};
        if (status)
            where.status = status;
        if (isFeatured !== undefined)
            where.isFeatured = isFeatured;
        if (authorId)
            where.authorId = authorId;
        if (tag)
            where.tags = { has: tag };
        if (searchTerm) {
            where.OR = [
                { title: { contains: searchTerm, mode: "insensitive" } },
                { content: { contains: searchTerm, mode: "insensitive" } },
            ];
        }
        return await prisma.post.findMany({
            where,
            orderBy: { createdAt: "desc" },
            include: {
                _count: { select: { comments: true } },
            },
        });
    },
    getPostBySlug: async (slug) => {
        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                comments: {
                    where: { parentId: null }, // Top-level comments
                    include: {
                        replies: true,
                    },
                    orderBy: { createdAt: "desc" },
                },
            },
        });
        if (!post) {
            throw new ApiError(404, `Post with slug '${slug}' not found.`);
        }
        // Increment view count atomically
        await prisma.post.update({
            where: { slug },
            data: { views: { increment: 1 } },
        });
        return post;
    },
    updatePost: async (id, payload) => {
        const postExists = await prisma.post.findUnique({ where: { id } });
        if (!postExists) {
            throw new ApiError(404, `Post with ID '${id}' not found.`);
        }
        return await prisma.post.update({
            where: { id },
            data: payload,
        });
    },
    deletePost: async (id) => {
        const postExists = await prisma.post.findUnique({ where: { id } });
        if (!postExists) {
            throw new ApiError(404, `Post with ID '${id}' not found.`);
        }
        return await prisma.post.delete({
            where: { id },
        });
    },
};
//# sourceMappingURL=post.service.js.map