import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please fill product name"],
        },
        price: {
            type: Number,
            min: [0, "Price must more than 0"],
        },
        size: {
            type: [Number],
            min: [0, "Price must more than 0"],
        },
        image: {
            type: String,
            require: [true, "Please fill product image"],
        },
        sub_images: [String],
        selling: {
            type: Boolean,
            default: true,
        },
        product_type: {
            type: Schema.Types.ObjectId,
            ref: "product_types",
        },
        desc: {
            type: Schema.Types.ObjectId,
            ref: "descriptions",
        },
    },
    { timestamps: { createdAt: "created_at" } }
);

const Product = mongoose.model("products", productSchema);
export default Product;
