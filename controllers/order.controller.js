import Order from "../models/order.model.js";
import AppError from "../utils/appError.util.js";
import Base from "./utils/base.controller.js";

const createOrder = Base.createOne(Order);
const findOrderById = Base.getOne(Order);
const updateOrderById = Base.updateOne(Order);
const findOrderByUserId = async (req, res, next) => {
    const id = req.params.id;
    try {
        const orders = await Order.find({ user_id: id });
        if (orders.length > 0) {
            res.status(200).json({
                status: "success",
                size: orders.length,
                data: orders,
            });
        } else {
            return next(
                new AppError(
                    401,
                    "fail",
                    "No order created by user",
                    req,
                    res,
                    next
                )
            );
        }
    } catch (error) {
        next(error);
    }
};
export default {
    createOrder,
    findOrderById,
    findOrderByUserId,
    updateOrderById,
};
