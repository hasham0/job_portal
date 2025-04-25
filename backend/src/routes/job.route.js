import { Router } from "express";
import {
    adminMiddleware,
    authMiddleware,
} from "../middlewares/auth.middleware.js";
import { body, param } from "express-validator";
import {
    allJobs,
    deleteJobById,
    getAdminJobs,
    getJobById,
    postJob,
    updatejob,
} from "../controllers/job.controller.js";

const router = Router();

// router.use([authMiddleware]);
router.route("/").get(allJobs);
router
    .route("/oneJob/:_id")
    .get([param("_id").isMongoId().withMessage("Invalid job id")], getJobById);
router.route("/adminJobs").get([authMiddleware, adminMiddleware], getAdminJobs);
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
            body("company").notEmpty().withMessage("Company ID is required"),
            body("applicationId")
                .optional()
                .isMongoId()
                .withMessage("Invalid application ID"),
        ],
        postJob
    );

router
    .route("/updateJob/:_id")
    .put(
        [
            authMiddleware,
            adminMiddleware,
            param("_id").isMongoId().withMessage("Invalid job id"),
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
            body("company").notEmpty().withMessage("Company ID is required"),
        ],
        updatejob
    );
router
    .route("/deleteJob/:_id")
    .delete(
        [
            authMiddleware,
            adminMiddleware,
            param("_id").isMongoId().withMessage("Invalid job id"),
        ],
        deleteJobById
    );

export default router;
