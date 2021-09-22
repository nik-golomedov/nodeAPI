const db = require("../models");

const getNotifications = async (req, res) => {
  try {
    const notificationsList = await db.notification.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json(notificationsList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNotification = async (req, res) => {
  try {
    await db.notification.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNotifications, deleteNotification };
