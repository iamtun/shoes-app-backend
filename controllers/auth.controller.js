import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Account from "../models/account.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/appError.util.js";

const signup = async (req, res, next) => {
    try {
        const { email, password, name, phone, address, rule } = req.body;
        const user = await User.create({ name, phone, address, email, rule });

        //decode password
        const _password = await bcrypt.hash(password, 12);

        const account = await Account.create({
            username: user.email,
            password: _password,
            user_id: user._id,
        });

        res.status(201).json({
            status: "success",
            data: {
                account,
            },
        });
    } catch (error) {
        next(error);
    }
};

const comparePassword = async (password, account) => {
    const originPass = account.password;
    return await bcrypt.compare(password, originPass);
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        //check user send username & password
        if (!username || !password) {
            return next(
                new AppError(
                    401,
                    "fail",
                    "Please provide username or password"
                ),
                req,
                res,
                next
            );
        }

        const account = await Account.findOne({ username }).select("+password");

        if (!account || !(await comparePassword(password, account))) {
            return (
                next(
                    new AppError(401, "fail", "Username or Password is wrong")
                ),
                req,
                res,
                next
            );
        }

        //create payload
        const userId = { userId: account.user_id };

        //create token
        const accessToken = jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET);

        res.status(200).json({
            status: "success",
            token: accessToken,
        });
    } catch (error) {
        next(error);
    }
};

const authentication = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; //Bear token
    if (!token)
        return next(new AppError(401, "fail", "No token")), req, res, next;

    const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //check verify
    if (verify?.error) {
        return next(new AppError(401, "fail", "JWT malformed")), req, res, next;
    }

    const user = await User.findById(verify.userId);
    req.rule = user.rule;
    next();
};

export default {
    signup,
    login,
    authentication,
};
