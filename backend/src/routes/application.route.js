import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { body } from "express-validator";

const router = Router();

router.route("/").get();

export default router;
