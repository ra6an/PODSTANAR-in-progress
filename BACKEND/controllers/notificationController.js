const Notification = require("../model/notificationSchema");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllNotifications = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Notification.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagginate();

  const notifications = await features.query;

  res.status(200).json({
    status: "success",
    length: notifications.length,
    data: notifications,
  });
});

exports.getUserNotifications = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  const features = new APIFeatures(Notification.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagginate();

  const notifications = await features.query;

  res.status(200).json({
    status: "success",
    length: notifications.length,
    data: notifications,
  });
});

exports.updateNotification = catchAsync(async (req, res, next) => {
  const notificationId = req.params.notificationId;
  const userInputs = { ...req.body };

  const notification = await Notification.findByIdAndUpdate(
    notificationId,
    { userInputs },
    { new: true }
  );

  if (!notification) {
    return next(new AppError("There is no notification with that ID...", 404));
  }

  res.status(200).json({
    status: "success",
    data: notification,
  });
});

exports.deleteNotification = catchAsync(async (req, res, next) => {
  const notificationId = req.params.notificationId;

  const notification = await Notification.findByIdAndDelete(notificationId);

  res.status(200).json({
    status: "success",
    data: "You deleted notification successfully!",
  });
});
