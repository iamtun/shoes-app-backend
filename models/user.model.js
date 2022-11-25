import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please fill your name"],
    },
    phone: {
        type: String,
        minLength: 10,
        unique: true,
        require: [true, "Please fill your phone"],
    },
    address: {
        type: String,
        require: [true, "Please fill your address"],
    },
    email: {
        type: String,
        require: [true, "Please fill your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    rule: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model("users", userSchema);
export default User;
