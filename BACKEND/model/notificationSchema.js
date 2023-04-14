const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    enum: ["booking", "booking-result", "review"],
    default: "booking",
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  },
  seen: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date },
});

notificationSchema.pre("save", function (next) {
  this.createdAt = new Date(Date.now());
  next();
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
