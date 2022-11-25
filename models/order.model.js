import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        total: {
            type: Number,
            min: [0, "Price must more than 0"],
            default: 0,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
    },
    { timestamps: { createdAt: "created_at" } }
);

const Order = mongoose.model("orders", orderSchema);
export default Order;
