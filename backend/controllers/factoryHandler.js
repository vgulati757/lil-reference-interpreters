import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import APIFeatures from "../utils/apiFeatures.js";

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const createOne = (Model) =>
  catchAsync(async (req, res) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: newDoc,
    });
  });

// GET DOCUMENT FROM SLUG
export const getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that Id", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const getAll = (Model) =>
  catchAsync(async (req, res) => {
    // Count all docs in DB (no filter)
    const totalDocs = await Model.countDocuments();

    // Build filter object first
    const tempFeatures = new APIFeatures(Model.find(), req.query).filter();
    const filterObj = tempFeatures.getFilter();

    // Count documents with only the filter (ignores pagination)
    const results = await Model.countDocuments(filterObj);

    // Now fetch docs with pagination
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const docs = await features.query;

    res.status(200).json({
      status: "success",
      totalDocs, // all products in DB
      results, // total filtered products (ignores limit)
      data: docs,
    });
  });
