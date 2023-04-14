const multer = require("multer");
const sharp = require("sharp");
const User = require("../model/userSchema");
const catchAsync = require("../utils/catchAsync");
const Article = require("../model/articleSchema");
const APIFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");
const nodeGeocoder = require("node-geocoder");

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

// exports.uploadArticlePhotos = upload.fields([{name: 'images', maxCount: 12}]);
exports.uploadArticleImages = upload.array("images", 12);

exports.resizeArticleImages = catchAsync(async (req, res, next) => {
  if (!req.files) return next();
  req.body.images = [];

  req.files.forEach(async (img, i) => {
    let fileName;
    if (img.originalname.includes(".jpeg"))
      fileName = `${img.originalname.slice(0, img.originalname.length - 5)}-${
        req.user._id
      }-${new Date().getTime()}-${i}.jpeg`;
    fileName = `${img.originalname.slice(0, img.originalname.length - 4)}-${
      req.user._id
    }-${new Date().getTime()}-${i}.jpeg`;

    req.body.images.push(fileName);

    await sharp(img.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/images/articles/${fileName}`);
  });

  next();
});

exports.getAllArticles = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Article.find().populate("reviews"),
    req.query
  )
    .filter()
    .search()
    .sort()
    .limitFields()
    .pagginate();

  const features2 = new APIFeatures(Article.find(), req.query)
    .filter()
    .search()
    .sort()
    .limitFields();

  const feautures2Query = await features2.query;
  const numOfArticles = feautures2Query.length;
  const articles = await features.query;

  console.log(numOfArticles);

  // const numOfArticles = await Article.find().countDocuments();

  res.status(200).json({
    status: "success",
    length: articles.length,
    data: articles,
    numOfArticles: numOfArticles,
  });
});

exports.getArticle = catchAsync(async (req, res, next) => {
  const articleId = req.params.articleId;

  const article = await Article.findById(articleId)
    .populate("owner")
    .populate("bookings")
    .populate({
      path: "reviews",
      populate: [{ path: "creator", select: "-notifications" }],
    });

  console.log(article);

  if (!article) {
    return next(new AppError("There is no article with that id!", 404));
  }

  res.status(200).json({
    status: "success",
    data: article,
  });
});

exports.createArticle = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const userInputs = { ...req.body };

  // console.log(req.body);

  const geocoder = nodeGeocoder({ provider: "openstreetmap" });

  const geoResult = await geocoder.geocode("envera sehovica 46");

  console.log(geoResult, "💰");

  userInputs.owner = userId;

  if (userInputs.images.length === 0) userInputs.images = ["default.jpeg"];
  if (!userInputs.mainImage) userInputs.mainImage = userInputs.images[0];

  // console.log(userInputs);

  const article = await Article.create(userInputs);

  if (!article) {
    return next(new Error("Something went wrong uh oh uh oh!!!"));
  }

  await User.findByIdAndUpdate(userId, { $push: { articles: article._id } });

  res.status(200).json({
    status: "success",
    message: "You successfully created a new article.",
    data: article,
  });
});

exports.updateArticle = catchAsync(async (req, res, next) => {
  const articleId = req.params.articleId;
  const userId = req.user._id;
  const userInputs = req.body;

  let article = await Article.findById(articleId);

  if (!article) {
    return next(new AppError("There is no article with that ID!", 404));
  }

  const isOwner = article.owner.toHexString() === userId;

  if (
    (!isOwner && req.user.role === "admin") ||
    (!isOwner && req.user.role === "moderator")
  ) {
    return next(
      new AppError("You are not allowed to update this article.", 401)
    );
  }

  article = await Article.findByIdAndUpdate(articleId, userInputs, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    message: "You update your article successfully!",
    data: article,
  });
});

exports.deleteArticle = catchAsync(async (req, res, next) => {
  const userId = req.user.user._id;
  const articleId = req.params.articleId;

  const article = await Article.findById(articleId);

  if (!article) {
    return next(new AppError("There is no article with that ID!", 404));
  }

  const isCreator = userId === article.creator.toHexString();

  if (
    (!isCreator && req.user.role !== "admin") ||
    (!isCreator && req.user.role !== "moderator")
  ) {
    return next(
      new AppError("You are not allowed to delete this article!", 401)
    );
  }

  await Article.findByIdAndDelete(articleId);
  await User.findByIdAndUpdate(userId, { $pull: { articles: articleId } });

  res.status(200).json({
    status: "success",
    message: "You deleted article successfully!",
  });
});
