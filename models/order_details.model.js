import mongoose, { Schema } from "mongoose";

const orderDetailSchema = mongoose.Schema({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "products",
    },
    quantity: {
        type: Number,
        min: [0, "Quantity must more than 0"],
    },
    size: {
        type: Number,
        min: [0, "Quantity must more than 0"],
    },
    total: {
        type: Number,
        min: [0, "Quantity must more than 0"],
    },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'orders'
    }
});

const OrderDetail = mongoose.model("order_details", orderDetailSchema);
export default OrderDetail;
