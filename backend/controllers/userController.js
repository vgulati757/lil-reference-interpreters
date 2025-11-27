import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import * as factory from "../controllers/factoryHandler.js";

export const deleteMe = catchAsync(async (req, res) => {
  // 1. Find user by Id and update active property to false
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user POSTS password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword to update your password.",
        400
      )
    );
  }

  function filterObj(obj, ...allowedFields) {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) {
        // key: value
        newObj[el] = obj[el];
      }
    });

    return newObj;
  }

  // 2. Filtered out field names which are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email");

  // 3. Update Document
  const user = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // 2. Update User Document
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});

export const getAllUsers = factory.getAll(User);
export const addUser = factory.createOne(User);
export const getUser = factory.getOne(User);
export const editUser = factory.updateOne(User);
export const deleteUser = factory.deleteOne(User);
