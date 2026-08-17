import {} from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { PostService } from "./post.service.js";
import { ApiError } from "../../errors/ApiError.js";
import { PostStatus } from "../../generated/prisma/client.js";
export const PostController = {
    createPost: asyncHandler(async (req, res) => {
        const { title, slug, content, thumbnail, isFeatured, status, tags, authorId } = req.body;
        if (!title || !slug || !content || !authorId) {
            throw new ApiError(400, "Missing required fields: title, slug, content, authorId");
        }
        const post = await PostService.createPost({
            title,
            slug,
            content,
            thumbnail,
            isFeatured,
            status,
            tags,
            authorId,
        });
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Post created successfully",
            data: post,
        });
    }),
    getAllPosts: asyncHandler(async (req, res) => {
        const filters = {
            searchTerm: req.query.searchTerm ? String(req.query.searchTerm) : undefined,
            status: req.query.status ? req.query.status : undefined,
            isFeatured: req.query.isFeatured !== undefined ? req.query.isFeatured === "true" : undefined,
            authorId: req.query.authorId ? String(req.query.authorId) : undefined,
            tag: req.query.tag ? String(req.query.tag) : undefined,
        };
        const posts = await PostService.getAllPosts(filters);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Posts retrieved successfully",
            data: posts,
        });
    }),
    getPostBySlug: asyncHandler(async (req, res) => {
        const slug = String(req.params.slug);
        if (!slug)
            throw new ApiError(400, "Slug parameter is required");
        const post = await PostService.getPostBySlug(slug);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Post retrieved successfully",
            data: post,
        });
    }),
    updatePost: asyncHandler(async (req, res) => {
        const id = String(req.params.id);
        if (!id)
            throw new ApiError(400, "Post ID is required");
        const updatedPost = await PostService.updatePost(id, req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Post updated successfully",
            data: updatedPost,
        });
    }),
    deletePost: asyncHandler(async (req, res) => {
        const id = String(req.params.id);
        if (!id)
            throw new ApiError(400, "Post ID is required");
        const deletedPost = await PostService.deletePost(id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Post deleted successfully",
            data: deletedPost,
        });
    }),
};
//# sourceMappingURL=post.controller.js.map