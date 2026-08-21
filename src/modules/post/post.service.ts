import { prisma } from "../../lib/prisma";
import { type ICreatePostInput, type IPostFilterOptions,type IUpdatePostInput } from "./post.interface";

export const PostService = {
  createPost: async (payload: ICreatePostInput) => {
    try {
      const existingSlug = await prisma.post.findUnique({
        where: { slug: payload.slug },
      });

      if (existingSlug) {
        throw new Error(`Post with slug '${payload.slug}' already exists.`);
      }

      return await prisma.post.create({
        data: payload,
      });
    } catch (error) {
      console.error("[PostService.createPost Error]:", error);
      throw error;
    }
  },

  getAllPosts: async (filters: IPostFilterOptions) => {
    try {
      const { searchTerm, status, isFeatured, authorId, tag } = filters;
      const where: any = {};

      if (status) where.status = status;
      if (isFeatured !== undefined) where.isFeatured = isFeatured;
      if (authorId) where.authorId = authorId;
      if (tag) where.tags = { has: tag };

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
    } catch (error) {
      console.error("[PostService.getAllPosts Error]:", error);
      throw error;
    }
  },

  getPostBySlug: async (slug: string) => {
    try {
      const post = await prisma.post.findUnique({
        where: { slug },
        include: {
          comments: {
            where: { parentId: null },
            include: {
              replies: true,
            },
            orderBy: { createdAt: "desc" },
          },
        },
      });

      if (!post) {
        throw new Error(`Post with slug '${slug}' not found.`);
      }

      await prisma.post.update({
        where: { slug },
        data: { views: { increment: 1 } },
      });

      return post;
    } catch (error) {
      console.error("[PostService.getPostBySlug Error]:", error);
      throw error;
    }
  },

  updatePost: async (id: string, payload: IUpdatePostInput) => {
    try {
      const postExists = await prisma.post.findUnique({ where: { id } });
      if (!postExists) {
        throw new Error(`Post with ID '${id}' not found.`);
      }

      return await prisma.post.update({
        where: { id },
        data: payload,
      });
    } catch (error) {
      console.error("[PostService.updatePost Error]:", error);
      throw error;
    }
  },

  deletePost: async (id: string) => {
    try {
      const postExists = await prisma.post.findUnique({ where: { id } });
      if (!postExists) {
        throw new Error(`Post with ID '${id}' not found.`);
      }

      return await prisma.post.delete({
        where: { id },
      });
    } catch (error) {
      console.error("[PostService.deletePost Error]:", error);
      throw error;
    }
  },
};
