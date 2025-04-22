import asyncHandler from "../middlewares/async-handler.middleware.js";
import {
    CustomError,
    ValidationError,
} from "../lib/utils/customize-error-messages.util.js";
import {
    userCreateService,
    userFindService,
    UpdateProfileService,
    userFindServiceById,
} from "../lib/services/user.service.js";
import { cookieOptions, ACCESS_TOKEN } from "../constant.js";
import { validationResult } from "express-validator";
import getDataUri from "../lib/utils/data-uri.util.js";
import cloudinary from "../lib/utils/cloudinary.util.js";

const registerUser = asyncHandler(async (request, response) => {
    // Validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    // extract data
    const { fullname, email, phoneNumber, password, role } = request.body;
    const file = request.file;
    const fileUri = getDataUri(file);
    const cloudinaryResponse = await cloudinary.uploader.upload(
        fileUri.content,
        {
            resource_type: "image",
            folder: "job-portal",
        }
    );

    // check if user already exists with this email
    const isUserExists = await userFindService(email);
    if (isUserExists) {
        throw new CustomError("User already exists with this email", 400);
    }

    // create new user
    await userCreateService({
        fullname,
        email,
        phoneNumber,
        password,
        role,
        profilePhoto: cloudinaryResponse.secure_url,
    });

    return response
        .status(200)
        .json({ message: "User registered successfully" });
});

const loginUser = asyncHandler(async (request, response) => {
    // Validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    // extract data
    const { email, password, role } = request.body;

    // check and validate email
    const isUserExists = await userFindService(email, "+password");
    if (!isUserExists) {
        throw new CustomError("User not exists with this email", 400);
    }

    // check and validate password
    const isPasswordMatch = await isUserExists.isPasswordCorrect(password);
    if (!isPasswordMatch) {
        throw new CustomError("Invalid User", 400);
    }

    // check and validate role
    if (isUserExists.role !== role) {
        throw new CustomError("Invalid User", 400);
    }

    // Generate Auth Token
    const token = await isUserExists.generateAuthToken();

    // deep copy user object and delete password
    const userObject = Object.assign({}, isUserExists.toObject());
    delete userObject.password;

    return response
        .status(200)
        .cookie(ACCESS_TOKEN, token, cookieOptions)
        .json({
            message: `Welcome back ${userObject.fullname}`,
            user: userObject,
        });
});

const logoutUser = asyncHandler((request, response) => {
    return response
        .status(200)
        .clearCookie(ACCESS_TOKEN, "", { maxAge: 0 })
        .json({ message: "Logout successfully", user: null });
});

const updateUserProfile = asyncHandler(async (request, response) => {
    // Validate request
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        throw new ValidationError(errors.array());
    }

    // extract data , files and user id from request
    const { fullname, email, phoneNumber, role, bio, skills } = request.body;
    const { _id } = request.user;

    // check if user exit or not
    const isUserExists = await userFindServiceById(_id);
    if (!isUserExists) {
        throw new CustomError("User not exists with this email", 400);
    }

    const resumefile = request.file;
    const resumefileUri = getDataUri(resumefile);

    // cloudinary upload
    const cloudinaryResponse = await cloudinary.uploader.upload(
        resumefileUri.content,
        {
            resource_type: "raw",
            folder: "job-portal",
            type: "public",
        }
    );

    // update profile
    const updatedUser = await UpdateProfileService(
        _id,
        fullname,
        email,
        phoneNumber,
        role,
        bio,
        skills,
        cloudinaryResponse.secure_url,
        resumefile.originalname,
        isUserExists.profile.profilePhoto
    );

    return response
        .status(200)
        .json({ message: "Profile updated successfully", user: updatedUser });
});
export { registerUser, loginUser, logoutUser, updateUserProfile };
