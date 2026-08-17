import { type Response } from "express";
interface IResponseData<T> {
    statusCode: number;
    success: boolean;
    message?: string;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
    };
    data: T;
}
export declare const sendResponse: <T>(res: Response, data: IResponseData<T>) => void;
export {};
//# sourceMappingURL=sendResponse.d.ts.map