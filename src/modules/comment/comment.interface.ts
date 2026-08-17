import { CommentStatus } from "../../generated/prisma/client.js";

export interface ICreateCommentInput {
  content: string;
  postId: string;
  authorId: string;
  parentId?: string | undefined;
}

export interface IUpdateCommentStatusInput {
  status: CommentStatus;
}
