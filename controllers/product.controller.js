import uploadCloud from "../configs/cloudinary.config.js";
import Product from "../models/product.model.js";
import Desc from "../models/desc.model.js";
import AppError from "../utils/appError.util.js";

const uploadImage = async (files) => {
    const linkImages = [];
    for (const file of files) {
        const result = await uploadCloud.cloudinary.uploader.upload(file.path);
        linkImages.push(result.url);
    }

    return linkImages;
};

const checkNameIsExist = async (name) => {
    const products = await Product.find({});
    if (products.length > 0) {
        for (const product of products) {
            if (product.name.trim() === name.trim()) return true;
        }
    }

    return false;
};

const createProduct = async (req, res, next) => {
    if (req.rule) {
        try {
            const { name, price, size, product_type, desc_title, desc } =
                req.body;

            if (name && price && size && product_type && desc_title && desc) {
                if (await checkNameIsExist(name)) {
                    return next(
                        new AppError(400, "fail", "Product name is exist!"),
                        req,
                        res,
                        next
                    );
                } else {
                    const files = req.files;
                    const linkImages = await uploadImage(files);

                    //first image is main image
                    const image = linkImages.shift();
                    const _desc = await Desc.create({
                        title: desc_title,
                        desc,
                    });

                    const product = await Product.create({
                        name,
                        price,
                        size,
                        product_type,
                        image,
                        sub_images: linkImages,
                        desc: _desc._id,
                    });

                    res.status(201).json({ status: "success", data: product });
                }
            } else {
                return next(
                    new AppError(
                        400,
                        "fail",
                        "Please provide enough information!"
                    ),
                    req,
                    res,
                    next
                );
            }
        } catch (error) {
            next(error);
        }
    } else {
        return next(
            new AppError(403, "fail", "You no permission!"),
            req,
            res,
            next
        );
    }
};

const getProductById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id)
            .populate("product_type")
            .populate("desc");
        if (!product) {
            return next(
                new AppError(404, "fail", `Don't find product by id -> ${id}`),
                req,
                res,
                next
            );
        }

        res.status(200).json({ status: "success", data: product });
    } catch (error) {
        next(error);
    }
};

const getAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find({})
            .populate("product_type")
            .populate("desc");

        if (products.length < 0) {
            return next(
                new AppError(400, "fail", `Don't have product in db`),
                req,
                res,
                next
            );
        }
        res.status(200).json({
            status: "success",
            results: products.length,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

//client send - server give no body
const updateProduct = async (req, res, next) => {
    if (req.rule) {
        try {
            const {
                name,
                price,
                size,
                product_type,
                selling,
                desc_id,
                desc_title,
                desc,
            } = req.body;
            const id = req.params.id;
            const files = req.files;

            if (name && price && size && product_type && desc_title && desc) {
                // find product
                const product = await Product.findById(id);

                if (product) {
                    //assign new info
                    product.name = name;
                    product.price = price;
                    product.size = size;
                    product.product_type = product_type;

                    //true or false
                    if (selling) {
                        product.selling = selling;
                    }

                    if (desc_id) {
                        const _desc = await Desc.findById(desc_id);
                        if (_desc) {
                            _desc.desc_title = desc_title;
                            _desc.desc = desc;
                            await _desc.save();
                        }
                    }

                    if (files.length > 0) {
                        const linkImages = await uploadImage(files);
                        //first image is main image
                        const image = linkImages.shift();
                        product.image = image;
                        product.sub_images = linkImages;
                    }
                    const _product = await product.save();
                    res.status(201).json({ status: "success", data: _product });
                } else {
                    return next(
                        new AppError(
                            404,
                            "fail",
                            `Don't find product by id -> ${id}`
                        ),
                        req,
                        res,
                        next
                    );
                }
            } else {
                return next(
                    new AppError(
                        400,
                        "fail",
                        "Please provide enough information!"
                    ),
                    req,
                    res,
                    next
                );
            }
        } catch (error) {
            next(error);
        }
    } else {
        return next(
            new AppError(403, "fail", "You no permission!"),
            req,
            res,
            next
        );
    }
};

export default { createProduct, getProductById, getAllProduct, updateProduct };
