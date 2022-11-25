import UserController from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.route("/").get(UserController.getAllUser);
router.route("/:id").get(UserController.findUserById);
export default router;
