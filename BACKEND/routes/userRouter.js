const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const messageRouter = require("../routes/messageRouter");
const notificationRouter = require("../routes/notificationRouter");
const bookingRouter = require("../routes/bookingRouter");
const passport = require("passport");

const router = express.Router();

router.use("/:userId/messages", messageRouter);
router.use("/:userId/notifications", notificationRouter);
router.use("/:userId/bookings", bookingRouter);

router.route("/").get(userController.getAllUsers);

router
  .route("/me")
  .all(passport.authenticate("jwt", { session: false }))
  .get(userController.getMe)
  .patch(
    userController.uploadUserImage,
    userController.resizeUserImage,
    userController.updateMe
  );

router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout);

module.exports = router;
