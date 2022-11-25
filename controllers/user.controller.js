import Base from "./utils/base.controller.js";
import User from "../models/user.model.js";

const findUserById = Base.getOne(User);
const getAllUser = Base.getAll(User);

export default { findUserById, getAllUser };
