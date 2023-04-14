const express = require("express");
const messageController = require("../controllers/messageController");
const passport = require("passport");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .all(passport.authenticate("jwt", { session: false }))
  .get(messageController.getAllMessages)
  .post(messageController.createMessage);

router
  .route("/:messagesId/:messageId")
  .all(passport.authenticate("jwt", { session: false }))
  .post(messageController.haveSeenMessage);

router
  .route("/:messagesId")
  .all(passport.authenticate("jwt", { session: false }))
  .get(messageController.getMessages);

module.exports = router;
