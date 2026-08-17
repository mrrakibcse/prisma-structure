import {} from "express";
import { asyncHandler } from "../../middlewares/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { CommentService } from "./comment.service.js";
import { ApiError } from "../../errors/ApiError.js";
export const CommentController = {
    createComment: asyncHandler(async (req, res) => {
        const { content, postId, authorId, parentId } = req.body;
        if (!content || !postId || !authorId) {
            throw new ApiError(400, "Missing required fields: content, postId, authorId");
        }
        const comment = await CommentService.createComment({
            content,
            postId,
            authorId,
            parentId,
        });
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Comment created successfully",
            data: comment,
        });
    }),
    getCommentsByPost: asyncHandler(async (req, res) => {
        const postId = String(req.params.postId);
        if (!postId)
            throw new ApiError(400, "Post ID parameter is required");
        const comments = await CommentService.getCommentsByPost(postId);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Comments retrieved successfully",
            data: comments,
        });
    }),
    updateCommentStatus: asyncHandler(async (req, res) => {
        const id = String(req.params.id);
        const { status } = req.body;
        if (!id)
            throw new ApiError(400, "Comment ID parameter is required");
        if (!status)
            throw new ApiError(400, "Status is required");
        const updatedComment = await CommentService.updateCommentStatus(id, { status });
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Comment status updated successfully",
            data: updatedComment,
        });
    }),
    deleteComment: asyncHandler(async (req, res) => {
        const id = String(req.params.id);
        if (!id)
            throw new ApiError(400, "Comment ID parameter is required");
        const deletedComment = await CommentService.deleteComment(id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Comment deleted successfully",
            data: deletedComment,
        });
    }),
};
//# sourceMappingURL=comment.controller.js.map