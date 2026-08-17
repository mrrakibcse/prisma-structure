import { type ICreateCommentInput, type IUpdateCommentStatusInput } from "./comment.interface.js";
export declare const CommentService: {
    createComment: (payload: ICreateCommentInput) => Promise<{
        id: string;
        content: string;
        postId: string;
        authorId: string;
        parentId: string | null;
        status: import("../../generated/prisma/enums.js").CommentStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getCommentsByPost: (postId: string) => Promise<({
        replies: {
            id: string;
            content: string;
            postId: string;
            authorId: string;
            parentId: string | null;
            status: import("../../generated/prisma/enums.js").CommentStatus;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        content: string;
        postId: string;
        authorId: string;
        parentId: string | null;
        status: import("../../generated/prisma/enums.js").CommentStatus;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    updateCommentStatus: (id: string, payload: IUpdateCommentStatusInput) => Promise<{
        id: string;
        content: string;
        postId: string;
        authorId: string;
        parentId: string | null;
        status: import("../../generated/prisma/enums.js").CommentStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteComment: (id: string) => Promise<{
        id: string;
        content: string;
        postId: string;
        authorId: string;
        parentId: string | null;
        status: import("../../generated/prisma/enums.js").CommentStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=comment.service.d.ts.map