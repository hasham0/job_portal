import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
    login,
    logout,
    register,
    updateProfile,
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
    register
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
        login
    );

router.route("/profile/update").post(
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

    updateProfile
);

router.route("/logout").post([authMiddleware], logout);
export default router;
