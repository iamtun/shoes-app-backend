import OrderController from "../controllers/order.controller.js";
import express from "express";

const router = express.Router();

router.route("/").post(OrderController.createOrder);
router
    .route("/:id")
    .get(OrderController.findOrderById)
    .put(OrderController.updateOrderById);
router.route("/user/:id").get(OrderController.findOrderByUserId);

export default router;
