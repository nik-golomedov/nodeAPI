const db = require("../models");
const socket = require("../services/socket");

const addReview = async (req, res) => {
  try {
    const {
      text, bookId, targetUserId, reviewId,
    } = req.body;
    await db.review.create({
      text,
      bookId: +bookId,
      userId: req.user.id,
      targetUserId,
      reviewId,
    });
    const io = socket.getInstance();
    const user = socket.getUser();
    if (targetUserId && targetUserId !== req.user.id) {
      const newNotification = await db.notification.create({
        userId: targetUserId,
        message: "На ваш комментарий ответили",
        type: "replyToComment",
        bookId,
      });
      const actualSocket = user[targetUserId].socketId;
      io.to(actualSocket).emit("newComment", newNotification);
    }
    res.status(200).json({ message: "Review added success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getReview = async (req, res) => {
  try {
    const bookId = +req.params.id;
    const review = await db.review.findAll({
      where: { bookId, targetUserId: null },
      include: [
        {
          model: db.user,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: db.review,
          include: { model: db.user, attributes: { exclude: "password" } },
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { addReview, getReview };
