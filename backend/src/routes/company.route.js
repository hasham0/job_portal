import { Router } from "express";
import {
    adminMiddleware,
    authMiddleware,
} from "../middlewares/auth.middleware.js";
import { body, param } from "express-validator";
import {
    getCompaniesByUserId,
    getCompany,
    getCompanies,
    registerCompany,
    updateCompanyDetails,
    deleteCompany,
} from "../controllers/company.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").get([authMiddleware, adminMiddleware], getCompanies);
router
    .route("/registerCompany")
    .post(
        [
            authMiddleware,
            adminMiddleware,
            body("name")
                .isLength({ min: 3 })
                .withMessage("fullname must be atlest 3 character long"),
        ],
        registerCompany
    );
router.route("/enrollUserCompany").get([authMiddleware], getCompaniesByUserId);
router
    .route("/currentCompany/:_id")
    .get(
        [
            authMiddleware,
            param("_id").isMongoId().withMessage("Invalid job id"),
        ],
        getCompany
    );
router
    .route("/updateCompanyDetails/:_id")
    .put(
        [
            authMiddleware,
            adminMiddleware,
            upload.single("file"),
            body("name")
                .optional()
                .isLength({ min: 3 })
                .withMessage("fullname must be atlest 3 character long"),
            body("description")
                .optional()
                .isLength({ min: 3 })
                .withMessage("description must be atlest 3 character long"),
            body("website")
                .optional()
                .isLength({ min: 3 })
                .withMessage("website must be atlest 3 character long"),
            body("location")
                .optional()
                .isLength({ min: 3 })
                .withMessage("location must be atlest 3 character long"),
            param("_id").isMongoId().withMessage("Invalid job id"),
        ],
        updateCompanyDetails
    );
router
    .route("/deleteCompany/:_id")
    .delete(
        [
            authMiddleware,
            adminMiddleware,
            param("_id").isMongoId().withMessage("Invalid job id"),
        ],
        deleteCompany
    );

export default router;
