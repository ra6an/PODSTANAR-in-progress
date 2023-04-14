const express = require("express");
const notificationController = require("../controllers/notificationController");

const router = express.Router({ mergeParams: true });

router.route("/").get(notificationController.getUserNotifications);
router
  .route("/:notificationsId")
  .patch(notificationController.updateNotification)
  .delete(notificationController.deleteNotification);

module.exports = router;
