import { type Request, type Response } from "express";

import { sendResponse } from "../../utils/sendResponse";
import { CommentService } from "./comment.service";

export const CommentController = {
  createComment: async (req: Request, res: Response): Promise<void> => {
    try {
      const { content, postId, authorId, parentId } = req.body;
      const finalAuthorId = authorId || req.user?.id;

      if (!content || !postId || !finalAuthorId) {
        res.status(400).json({
          success: false,
          message: "Missing required fields: content, postId, authorId",
        });
        return;
      }

      const comment = await CommentService.createComment({
        content,
        postId,
        authorId: finalAuthorId,
        parentId,
      });

      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Comment created successfully",
        data: comment,
      });
    } catch (error: any) {
      console.error("[CommentController.createComment Error]:", error);
      res.status(400).json({
        success: false,
        message: error?.message || "Failed to create comment",
      });
    }
  },

  getCommentsByPost: async (req: Request, res: Response): Promise<void> => {
    try {
      const postId = String(req.params.postId);
      if (!postId) {
        res.status(400).json({
          success: false,
          message: "Post ID parameter is required",
        });
        return;
      }

      const comments = await CommentService.getCommentsByPost(postId);

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Comments retrieved successfully",
        data: comments,
      });
    } catch (error: any) {
      console.error("[CommentController.getCommentsByPost Error]:", error);
      res.status(500).json({
        success: false,
        message: error?.message || "Failed to retrieve comments",
      });
    }
  },

  updateCommentStatus: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      const { status } = req.body;

      if (!id) {
        res.status(400).json({
          success: false,
          message: "Comment ID parameter is required",
        });
        return;
      }
      if (!status) {
        res.status(400).json({
          success: false,
          message: "Status is required",
        });
        return;
      }

      const updatedComment = await CommentService.updateCommentStatus(id, { status });

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Comment status updated successfully",
        data: updatedComment,
      });
    } catch (error: any) {
      console.error("[CommentController.updateCommentStatus Error]:", error);
      res.status(400).json({
        success: false,
        message: error?.message || "Failed to update comment status",
      });
    }
  },

  deleteComment: async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      if (!id) {
        res.status(400).json({
          success: false,
          message: "Comment ID parameter is required",
        });
        return;
      }

      const deletedComment = await CommentService.deleteComment(id);

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Comment deleted successfully",
        data: deletedComment,
      });
    } catch (error: any) {
      console.error("[CommentController.deleteComment Error]:", error);
      res.status(400).json({
        success: false,
        message: error?.message || "Failed to delete comment",
      });
    }
  },
};
