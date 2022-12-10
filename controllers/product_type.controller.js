import ProductType from "../models/product_type.model.js";
import Base from "./utils/base.controller.js";

const createProductType = Base.createOne(ProductType);
const getAllProductType = Base.getAll(ProductType);
const getProductType = Base.getOne(ProductType);
const updateProductType = Base.updateOne(ProductType);
export default { createProductType, getProductType, getAllProductType, updateProductType };
