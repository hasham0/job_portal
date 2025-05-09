import "dotenv/config";
import jwt from "jsonwebtoken";
import asyncHandler from "./async-handler.middleware.js";
import { ACCESS_TOKEN } from "../constant.js";
import { CustomError } from "../lib/utils/customize-error-messages.util.js";
import User from "../models/user.model.js";

const authMiddleware = asyncHandler(async (request, response, next) => {
    const token =
        request.cookies[ACCESS_TOKEN] ||
        request.headers?.authorization?.split(" ")[1];
    if (!token) {
        throw new CustomError("Unauthorized Token", 401);
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const isUserExist = await User.findById({ _id: decoded._id });
        if (!isUserExist) {
            throw new CustomError("Unauthorized User", 401);
        }
        request.user = isUserExist;
        next();
    } catch (error) {
        next(error);
    }
});
const adminMiddleware = asyncHandler(async (request, response, next) => {
    const user = request.user; // Corrected typo: request.user, not request.usr

    if (!user) {
        throw new CustomError("Unauthorized Access", 401);
    }

    if (user.role === "admin" || user.role === "recruiter") {
        next();
    } else {
        throw new CustomError("Forbidden: Admins or Recruiters only", 403);
    }
});

export { authMiddleware, adminMiddleware };
