export class ApiError extends Error {
    statusCode;
    isOperational;
    constructor(statusCode, message, stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
//# sourceMappingURL=ApiError.js.map