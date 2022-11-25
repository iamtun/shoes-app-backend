import OrderDetailController from "../controllers/order_detail.controller.js";
import express from "express";

const router = express.Router();

router.route("/").post(OrderDetailController.createOrderDetail);
router.route("/:id").get(OrderDetailController.findOrderDetailByOrderId);
export default router;
