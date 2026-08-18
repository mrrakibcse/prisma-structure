import { type Request, type Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { PostService } from "./post.service";
import { PostStatus } from "../../generated/prisma/client";

export const PostController = {
  createPost: async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, slug, content, thumbnail, isFeatured, status, tags, authorId } = req.body;
      const finalAuthorId = authorId || req.user?.id;

      if (!title || !slug || !content || !finalAuthorId) {
        res.status(400).json({
          success: false,
          message: "Missing required fields: title, slug, content, authorId",
        });
        return;
      }

      const post = await PostService.createPost({
        title,
        slug,
        content,
        thumbnail,
        isFeatured,
        status,
        tags,
        authorId: finalAuthorId,
      });

      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Post created successfully",
        data: post,
      });
    } catch (error: any) {
      console.error("[PostController.createPost Error]:", error);
      res.status(400).json({
        success: false,
        message: error?.message || "Failed to create post",
      });
    }
  },

  getAllPosts: async (req: Request, res: Response): Promise<void> => {
    try {
      const filters = {
        searchTerm: req.query.searchTerm ? String(req.query.searchTerm) : undefined,
        status: req.query.status ? (req.query.status as PostStatus) : undefined,
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
    } catch (error: any) {
      console.error("[PostController.getAllPosts Error]:", error);
      res.status(500).json({
        success: false,
        message: error?.message || "Failed to retrieve posts",
      });
    }
  },

  getPostBySlug: async (req: Request, res: Response): Promise<void> => {
    try {
      const slug = String(req.params.slug);
      if (!slug) {
        res.status(400).json({
          success: false,
          message: "Slug parameter is required",
        });
        return;
      }

      const post = await PostService.getPostBySlug(slug);

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Post retrieved successfully",
        data: post,
      });
    } catch (error: any) {
      console.error("[PostController.getPostBySlug Error]:", error);
      res.status(404).json({
        success: false,
        message: error?.message || "Failed to retrieve post",
      });
    }
  },

  updatePost: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      if (!id) {
        res.status(400).json({
          success: false,
          message: "Post ID is required",
        });
        return;
      }

      const updatedPost = await PostService.updatePost(id, req.body);

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Post updated successfully",
        data: updatedPost,
      });
    } catch (error: any) {
      console.error("[PostController.updatePost Error]:", error);
      res.status(400).json({
        success: false,
        message: error?.message || "Failed to update post",
      });
    }
  },

  deletePost: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      if (!id) {
        res.status(400).json({
          success: false,
          message: "Post ID is required",
        });
        return;
      }

      const deletedPost = await PostService.deletePost(id);

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Post deleted successfully",
        data: deletedPost,
      });
    } catch (error: any) {
      console.error("[PostController.deletePost Error]:", error);
      res.status(400).json({
        success: false,
        message: error?.message || "Failed to delete post",
      });
    }
  },
};
