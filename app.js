import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import AppError from "./utils/appError.util.js";
import GlobalHandler from "./controllers/utils/error.controller.js";

//routers
import AccountRouters from "./routers/account.route.js";
import AuthRouters from "./routers/auth.route.js";
import ProductTypeRouters from "./routers/product_type.route.js";
import ProductRouters from "./routers/product.route.js";
import OrderRouters from "./routers/order.route.js";
import UserRouters from "./routers/user.route.js";
import OrderDetailRouters from "./routers/order_detail.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/accounts", AccountRouters);
app.use("/api/v1/auth", AuthRouters);
app.use("/api/v1/product-types", ProductTypeRouters);
app.use("/api/v1/products", ProductRouters);
app.use("/api/v1/users",UserRouters );
app.use("/api/v1/orders", OrderRouters);
app.use("/api/v1/order-details", OrderDetailRouters);

app.use("*", (req, res, next) => {
    const err = new AppError(404, "fail", "undefined route");
    next(err, req, res, next);
});

app.use(GlobalHandler);

export default app;
