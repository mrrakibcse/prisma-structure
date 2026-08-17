export declare const CommentStatus: {
    readonly PENDING: 'PENDING';
    readonly APPROVED: 'APPROVED';
    readonly REJECTED: 'REJECTED';
};
export type CommentStatus = (typeof CommentStatus)[keyof typeof CommentStatus];
export declare const UserRole: {
    readonly ADMIN: 'ADMIN';
    readonly EDITOR: 'EDITOR';
    readonly USER: 'USER';
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const PostStatus: {
    readonly DRAFT: 'DRAFT';
    readonly PUBLISHED: 'PUBLISHED';
    readonly ARCHIVED: 'ARCHIVED';
};
export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus];
//# sourceMappingURL=enums.d.ts.map