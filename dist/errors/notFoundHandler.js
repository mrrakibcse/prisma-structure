import {} from "express";
import { ApiError } from "./ApiError.js";
export const notFoundHandler = (req, _res, next) => {
    next(new ApiError(404, `Route Not Found: ${req.originalUrl}`));
};
//# sourceMappingURL=notFoundHandler.js.map