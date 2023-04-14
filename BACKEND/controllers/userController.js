//
const multer = require("multer");
const sharp = require("sharp");

const User = require("../model/userSchema");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  cb(null, true);
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        "Not an image! Please provide valid image (.jpg, .jpeg, .png).",
        400
      )
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserImage = upload.single("image");

exports.resizeUserImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `${req.user._id}.jpeg`;

  req.body.image = req.file.filename;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/users/${req.file.filename}`);

  next();
});

exports.getMe = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // path: "messages",
  //   populate: [
  //     { path: "userOne", select: ["username", "_id", "image"] },
  //     { path: "userTwo", select: ["username", "_id", "image"] },
  //   ],

  const user = await User.findById(userId)
    .populate(["messages", "bookings"])
    .populate({
      path: "reviews",
      populate: [{ path: "article" }, { path: "creator" }],
    });

  if (!user) {
    return next(new AppError("There is no user with that ID!", 404));
  }

  res.status(200).send({
    status: "success",
    data: user,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const userInputs = { ...req.body };

  if (!req.file) delete userInputs["image"];

  const user = await User.findByIdAndUpdate(userId, userInputs, { new: true });

  if (!user) {
    return next(new AppError("There is no user with that ID!", 404));
  }

  res.status(200).send({
    status: "success",
    data: user,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).send({
    status: "success",
    data: users,
    length: users.length,
  });
});
