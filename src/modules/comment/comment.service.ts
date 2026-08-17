import { prisma } from "../../lib/prisma.js";
import { type ICreateCommentInput, type IUpdateCommentStatusInput } from "./comment.interface.js";

export const CommentService = {
  createComment: async (payload: ICreateCommentInput) => {
    try {
      // Verify post exists
      const postExists = await prisma.post.findUnique({ where: { id: payload.postId } });
      if (!postExists) {
        throw new Error(`Target post with ID '${payload.postId}' not found.`);
      }

      // If parentId provided, verify parent comment exists
      if (payload.parentId) {
        const parentComment = await prisma.comment.findUnique({ where: { id: payload.parentId } });
        if (!parentComment) {
          throw new Error(`Parent comment with ID '${payload.parentId}' not found.`);
        }
      }

      return await prisma.comment.create({
        data: payload,
      });
    } catch (error) {
      console.error("[CommentService.createComment Error]:", error);
      throw error;
    }
  },

  getCommentsByPost: async (postId: string) => {
    try {
      return await prisma.comment.findMany({
        where: { postId, parentId: null },
        include: {
          replies: {
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } catch (error) {
      console.error("[CommentService.getCommentsByPost Error]:", error);
      throw error;
    }
  },

  updateCommentStatus: async (id: string, payload: IUpdateCommentStatusInput) => {
    try {
      const commentExists = await prisma.comment.findUnique({ where: { id } });
      if (!commentExists) {
        throw new Error(`Comment with ID '${id}' not found.`);
      }

      return await prisma.comment.update({
        where: { id },
        data: { status: payload.status },
      });
    } catch (error) {
      console.error("[CommentService.updateCommentStatus Error]:", error);
      throw error;
    }
  },

  deleteComment: async (id: string) => {
    try {
      const commentExists = await prisma.comment.findUnique({ where: { id } });
      if (!commentExists) {
        throw new Error(`Comment with ID '${id}' not found.`);
      }

      return await prisma.comment.delete({
        where: { id },
      });
    } catch (error) {
      console.error("[CommentService.deleteComment Error]:", error);
      throw error;
    }
  },
};
