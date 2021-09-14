const db = require("../models");
const socket = require("../socket");

const addReply = async (req, res) => {
  try {
    const { text, reviewId, targetUserId, bookId } = req.body;
    const newReply = await db.reply.create({
      text,
      reviewId: +reviewId,
      userId: req.user.id,
      bookId,
      targetUserId,
    });
    const io = socket.getInstance();
    const user = socket.getUser();
    if (targetUserId !== req.user.id) {
      const actualSockets = user
        .filter((item) => item.id === targetUserId)
        .map((item) => item.socketId);
      actualSockets.forEach((item) => io.to(item).emit("newComment", newReply));
    }

    res.status(200).json({ messsage: "Reply added success" });
  } catch (error) {
    res.status(500).json({ messsage: error });
  }
};

module.exports = { addReply };
