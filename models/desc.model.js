import mongoose from "mongoose";

const descSchema = mongoose.Schema({
    title: {
        type: String,
        require: [true, "Please fill title"],
    },
    desc: {
        type: String,
        require: [true, "Please fill desc"],
    },
});

const Desc = mongoose.model("descriptions", descSchema);
export default Desc;
