import mongoose from "mongoose";
import env from "dotenv";
import app from "./app.js";

env.config({
    path: "./config.env",
});

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((connect) => console.log("db connected!"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`app is running on port -> ${PORT}`));
