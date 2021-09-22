const express = require("express");

const notificationController = require("../controllers/notificationController");
const useToken = require("../middleware/isAuth");

const notificationRouter = express.Router();

notificationRouter.get(
  "/",
  useToken.authenticateToken,
  notificationController.getNotifications,
);

notificationRouter.delete(
  "/:id",
  useToken.authenticateToken,
  notificationController.deleteNotification,
);

module.exports = notificationRouter;
