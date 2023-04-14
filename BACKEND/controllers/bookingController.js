const catchAsync = require("../utils/catchAsync");
const Booking = require("../model/bookingSchema");
const Article = require("../model/articleSchema");
const Notification = require("../model/notificationSchema");
const User = require("../model/userSchema");

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();

  if (!bookings) return next(console.log("jebo ovo"));

  res.status(200).json({
    status: "success",
    length: bookings.length,
    data: bookings,
  });
});

exports.getMyBookings = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);

  const bookings = await Booking.find({ owner: userId })
    .populate(["article", "customer"])
    .sort("-createdAt");
  const myBookings = await Booking.find({ customer: userId })
    .populate(["owner", "article"])
    .sort("-createdAt");

  if (!bookings || !myBookings)
    return next(new AppError("Cannot find bookings for that user!", 404));

  res.status(200).json({
    status: "success",
    length: bookings.length,
    data: { bookings, myBookings },
  });
});

exports.createBooking = catchAsync(async (req, res, next) => {
  const userInputs = { ...req.body };
  userInputs.customer = req.user._id;
  const booking = await Booking.create(userInputs);

  if (!booking) {
    return next(
      new AppError("Something went wrong with booking, try again later!", 404)
    );
  }

  const notInputs = {
    title: "booking",
    booking: booking._id,
    user: booking.owner,
    article: booking.article,
  };
  const notification = await Notification.create(notInputs);

  console.log(notification);

  if (!notification) {
    return next(
      new AppError("Something went wrong with creating notification!", 404)
    );
  }

  await User.findByIdAndUpdate(booking.owner, {
    $push: { bookings: booking._id },
    $push: { notifications: notification._id },
  });

  await User.findByIdAndUpdate(booking.customer, {
    $push: { bookings: booking._id },
  });

  res.status(200).json({
    status: "success",
    message: "You successfully booked it!",
    data: booking,
  });
});

exports.bookingResponse = catchAsync(async (req, res, next) => {
  const bookingId = req.params.bookingId;
  const userInputs = req.body;

  console.log(userInputs);
  console.log(bookingId);
  let booking;

  if (userInputs.response) {
    booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: userInputs.response },
      { new: true }
    );
    if (userInputs.response === "APPROVED") {
      await Article.findByIdAndUpdate(booking.article, {
        $push: { bookings: booking._id },
      });
    }
  } else if (userInputs.seen) {
    booking = await Booking.findByIdAndUpdate(
      bookingId,
      { seen: userInputs.seen },
      { new: true }
    );
  }

  console.log(booking);
  if (!booking) {
    return next(
      new AppError("Something went wrong with responding to booking!", 404)
    );
  }

  // const notInputs = {
  //   title: "booking-response",
  //   booking,
  //   user: booking.owner,
  // };
  // const notification = await Notification.create(notInputs);

  res.status(200).json({
    status: "success",
    message: "You responded to booking...",
  });
});
