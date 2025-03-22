import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
} from "../controllers/user.controller.js";
import { body } from "express-validator";

const router = Router();

router.route("/register").post(
    [
        body("fullname")
            .isLength({ min: 3 })
            .withMessage("fullname must be atlest 3 character long"),
        body("email").isEmail().withMessage("Invalid email"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("password must be atlest 6 character long"),
        body("phoneNumber")
            .isNumeric()
            .withMessage("Invalid phone number")
            .trim()
            .customSanitizer((value) => String(value)),
        body("role")
            .optional()
            .isIn(["student", "recruiter", "admin"])
            .withMessage("Invalid role"),
    ],
    registerUser
);
router
    .route("/login")
    .post(
        [
            body("email").isEmail().withMessage("Invalid email"),
            body("password")
                .isLength({ min: 6 })
                .withMessage("password must be atlest 6 character long"),
            body("role")
                .isIn(["student", "recruiter"])
                .withMessage("Invalid role"),
        ],
        loginUser
    );

router
    .route("/profileUpdate")
    .post(
        [
            authMiddleware,
            body("fullname")
                .isLength({ min: 3 })
                .withMessage("fullname must be atlest 3 character long"),
            body("email").isEmail().withMessage("Invalid email"),
            body("phoneNumber").isNumeric().withMessage("Invalid phone number"),
            body("role")
                .optional()
                .isIn(["student", "recruiter", "admin"])
                .withMessage("Invalid role"),
            body("profile.bio").isString().withMessage("Invalid bio"),
            body("profile.skills").isArray().withMessage("Invalid skills"),
        ],
        updateUserProfile
    );

router.route("/logout").post([authMiddleware], logoutUser);
export default router;
