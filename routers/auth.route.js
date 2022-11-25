import express from "express";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/signup").post(AuthController.signup);
router.route("/login").post(AuthController.login);

export default router;
