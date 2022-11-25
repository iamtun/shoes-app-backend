import mongoose, { Schema } from "mongoose";
import validator from "validator";

const accountSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: [true, "Please fill your email"],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, "Please provide a valid email"],
        },
        password: {
            type: String,
            select:false,
            require: [true, "Please fill your password"],
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
    },
    { timestamps: { createdAt: "created_at" } }
);

const Account = mongoose.model("accounts", accountSchema);
export default Account;
