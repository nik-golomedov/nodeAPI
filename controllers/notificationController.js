const db = require("../models");

const getNotification = async (req, res) => {
  try {
    const notificationList = await db.notification.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json(notificationList);
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

module.exports = { getNotification, deleteNotification };
