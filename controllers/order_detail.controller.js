import Order from "../models/order.model.js";
import OrderDetail from "../models/order_details.model.js";
import Product from "../models/product.model.js";
import AppError from "../utils/appError.util.js";
import OrderController from "./order.controller.js";

const createOrderDetail = async (req, res, next) => {
    try {
        const { product_id, quantity, size, order_id } = req.body;

        if (product_id && quantity && size && order_id) {
            const product = await Product.findById(product_id);
            if (product) {
                const total = product.price * quantity;

                const order = await Order.findById(order_id);
                if (order) {
                    const orderDetail = await OrderDetail.create({
                        product_id,
                        quantity,
                        size,
                        order_id,
                        total,
                    });

                    //update total in order
                    order.total += orderDetail.total;
                    await order.save();

                    res.status(201).json({
                        status: "success",
                        data: orderDetail,
                    });
                } else {
                    return next(
                        new AppError(404, "fail", "Order isn't exist"),
                        req,
                        res,
                        next
                    );
                }
            } else {
                return next(
                    new AppError(404, "fail", "Product isn't exist"),
                    req,
                    res,
                    next
                );
            }
        } else {
            return next(
                new AppError(400, "fail", "Please provide enough information!"),
                req,
                res,
                next
            );
        }
    } catch (error) {
        next(error);
    }
};

const findOrderDetailByOrderId = async (req, res, next) => {
    const order_id = req.params.id;
    try {
        const orderDetails = await OrderDetail.find({ order_id }).populate(
            "product_id"
        );

        const _orderDetails = orderDetails.map((detail) => {
            return {
                _id: detail._id,
                quantity: detail.quantity,
                size: detail.size,
                total: detail.total,
                order_id: detail.order_id,
                product_id: detail.product_id._id,
                product_name: detail.product_id.name,
                product_price: detail.product_id.price,
            };
        });

        res.status(200).json({
            status: "success",
            data: _orderDetails,
        });
    } catch (error) {
        next(error);
    }
};
export default { createOrderDetail, findOrderDetailByOrderId };
