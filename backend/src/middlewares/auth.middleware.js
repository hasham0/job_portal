import "dotenv/config";
import asyncHandler from "./async-handler.middleware.js";
import { CustomError } from "../lib/utils/customize-error-messages.js";

const authMiddleware = asyncHandler(async (request, response, next) => {
    try {
        next();
    } catch (error) {
        next(error);
    }
});

const adminMiddleware = asyncHandler(async (request, response, next) => {
    try {
        next();
    } catch (error) {
        next(error);
    }
});

export { authMiddleware, adminMiddleware };
