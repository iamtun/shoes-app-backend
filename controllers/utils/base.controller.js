import { model } from "mongoose";
import AppError from "../../utils/appError.util.js";

const createOne = (Model) => async (req, res, next) => {
    try {
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: "success",
            data: doc,
        });
    } catch (error) {
        next(error);
    }
};

const updateOne = (Model) => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!doc) {
            return next(
                new AppError(404, "fail", "No document found with that id"),
                req,
                res,
                next
            );
        }

        res.status(200).json({
            status: "success",
            data: doc,
        });
    } catch (error) {
        next(error);
    }
};

const deleteOne = (Model) => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(
                new AppError(404, "fail", "No document found with that id"),
                req,
                res,
                next
            );
        }

        res.status(204).json({
            status: "success",
            data: doc._id,
        });
    } catch (error) {
        next(error);
    }
};

const getOne = (Model) => async (req, res, next) => {
    try {
        const doc = await Model.findById(req.params.id);

        if (!doc) {
            return next(
                new AppError(404, "fail", "No document found with that id"),
                req,
                res,
                next
            );
        }

        res.status(200).json({
            status: "success",
            data: doc,
        });
    } catch (error) {
        next(error);
    }
};

const getAll = (Model) => async (req, res, next) => {
    try {
        const docs = await Model.find({});

        res.status(200).json({
            status: "success",
            results: docs.length,
            data: docs,
        });
    } catch (error) {}
};

export default { createOne, updateOne, deleteOne, getOne, getAll };
