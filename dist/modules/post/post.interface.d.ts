import { PostStatus } from "../../generated/prisma/client.js";
export interface ICreatePostInput {
    title: string;
    slug: string;
    content: string;
    thumbnail?: string | undefined;
    isFeatured?: boolean | undefined;
    status?: PostStatus | undefined;
    tags?: string[] | undefined;
    authorId: string;
}
export interface IUpdatePostInput {
    title?: string | undefined;
    slug?: string | undefined;
    content?: string | undefined;
    thumbnail?: string | undefined;
    isFeatured?: boolean | undefined;
    status?: PostStatus | undefined;
    tags?: string[] | undefined;
}
export interface IPostFilterOptions {
    searchTerm?: string | undefined;
    status?: PostStatus | undefined;
    isFeatured?: boolean | undefined;
    authorId?: string | undefined;
    tag?: string | undefined;
}
//# sourceMappingURL=post.interface.d.ts.map