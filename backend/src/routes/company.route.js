import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { body } from "express-validator";
import {
    getCompaniesByUserId,
    getCompany,
    getCompanies,
    registerCompany,
    updateCompanyDetails,
} from "../controllers/company.controller.js";

const router = Router();

router.route("/").get([authMiddleware], getCompanies);
router
    .route("/registerCompany")
    .post(
        [
            authMiddleware,
            body("name")
                .isLength({ min: 3 })
                .withMessage("fullname must be atlest 3 character long"),
        ],
        registerCompany
    );
router.route("/enrollUserCompany").get([authMiddleware], getCompaniesByUserId);
router.route("/currentCompany/:_id").get([authMiddleware], getCompany);
router
    .route("/updateCompanyDetails/:_id")
    .put(
        [
            authMiddleware,
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
        ],
        updateCompanyDetails
    );

export default router;
