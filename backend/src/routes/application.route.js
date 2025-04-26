import { Router } from "express";
import {
    adminMiddleware,
    authMiddleware,
} from "../middlewares/auth.middleware.js";
import { body, param } from "express-validator";
import {
    applicantsJob,
    appliedJobs,
    applyJob,
    updateStatus,
} from "../controllers/application.controller.js";

const router = Router();

router
    .route("/applyJob/:_id")
    .post(
        [
            authMiddleware,
            param("_id").isMongoId().withMessage("Invalid job id"),
        ],
        applyJob
    );

router.route("/appliedJobs").get([authMiddleware], appliedJobs);

router
    .route("/applicantsJob/:_id")
    .get(
        [
            authMiddleware,
            adminMiddleware,
            param("_id").isMongoId().withMessage("Invalid job id"),
        ],
        applicantsJob
    );

router
    .route("/updateStatus/:_id")
    .put(
        [
            authMiddleware,
            adminMiddleware,
            body("status")
                .isIn(["pending", "accepted", "rejected"])
                .withMessage("Invalid status"),
        ],
        updateStatus
    );
export default router;
