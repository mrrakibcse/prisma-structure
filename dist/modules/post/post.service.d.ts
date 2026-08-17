import { type ICreatePostInput, type IUpdatePostInput, type IPostFilterOptions } from "./post.interface.js";
export declare const PostService: {
    createPost: (payload: ICreatePostInput) => Promise<{
        id: string;
        title: string;
        slug: string;
        content: string;
        thumbnail: string | null;
        isFeatured: boolean;
        status: import("../../generated/prisma/enums.js").PostStatus;
        tags: string[];
        views: number;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllPosts: (filters: IPostFilterOptions) => Promise<({
        _count: {
            comments: number;
        };
    } & {
        id: string;
        title: string;
        slug: string;
        content: string;
        thumbnail: string | null;
        isFeatured: boolean;
        status: import("../../generated/prisma/enums.js").PostStatus;
        tags: string[];
        views: number;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getPostBySlug: (slug: string) => Promise<{
        comments: ({
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
        })[];
    } & {
        id: string;
        title: string;
        slug: string;
        content: string;
        thumbnail: string | null;
        isFeatured: boolean;
        status: import("../../generated/prisma/enums.js").PostStatus;
        tags: string[];
        views: number;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatePost: (id: string, payload: IUpdatePostInput) => Promise<{
        id: string;
        title: string;
        slug: string;
        content: string;
        thumbnail: string | null;
        isFeatured: boolean;
        status: import("../../generated/prisma/enums.js").PostStatus;
        tags: string[];
        views: number;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deletePost: (id: string) => Promise<{
        id: string;
        title: string;
        slug: string;
        content: string;
        thumbnail: string | null;
        isFeatured: boolean;
        status: import("../../generated/prisma/enums.js").PostStatus;
        tags: string[];
        views: number;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=post.service.d.ts.map