import { Router } from "express";
import {
    adminMiddleware,
    authMiddleware,
} from "../middlewares/auth.middleware.js";
import { body, param } from "express-validator";
import {
    allJobs,
    getAdminJobs,
    getJobById,
    postJob,
} from "../controllers/job.controller.js";

const router = Router();

router.route("/").get([authMiddleware], allJobs);
router
    .route("/oneJob/:_id")
    .get(
        [
            authMiddleware,
            param("_id").isMongoId().withMessage("Invalid job id"),
        ],
        getJobById
    );
router.route("/adminJob").get([authMiddleware, adminMiddleware], getAdminJobs);
router
    .route("/postJob")
    .post(
        [
            authMiddleware,
            adminMiddleware,
            body("title").notEmpty().withMessage("Title is required"),
            body("description")
                .notEmpty()
                .withMessage("Description is required"),
            body("requirements")
                .isString()
                .withMessage("Requirements is required"),
            body("salary").isNumeric().withMessage("Salary must be a number"),
            body("location").notEmpty().withMessage("Location is required"),
            body("jobType")
                .isIn(["full-time", "part-time", "contract", "internship"])
                .withMessage("Invalid job type"),
            body("experience")
                .isNumeric()
                .withMessage("Experience must be a number"),
            body("position").notEmpty().withMessage("Position is required"),
            body("companyId").notEmpty().withMessage("Company ID is required"),
            body("applicationId")
                .optional()
                .isMongoId()
                .withMessage("Invalid application ID"),
        ],
        postJob
    );

export default router;
