const express = require("express");
const bookingController = require("../controllers/bookingController");
const passport = require("passport");
// const { post } = require("./userRouter");

const router = express.Router();

router
  .route("/:bookingId")
  .all(passport.authenticate("jwt", { session: false }))
  .patch(bookingController.bookingResponse);
router
  .route("/me")
  .all(passport.authenticate("jwt", { session: false }))
  .get(bookingController.getMyBookings);

router
  .route("/")
  .all(passport.authenticate("jwt", { session: false }))
  .post(bookingController.createBooking);

module.exports = router;
