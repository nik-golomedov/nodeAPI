const { sequelize } = require("../models");
const db = require("../models");
const socket = require("../socket");

const addReview = async (req, res) => {
  try {
    const { text, bookId } = req.body;
    const newReview = await db.review.create({
      text,
      bookId: +bookId,
      userId: req.user.id,
    });
    res.status(200).json({ messsage: "Review added success" });
  } catch (error) {
    res.status(500).json({ messsage: error });
  }
};

const getReview = async (req, res) => {
  try {
    const bookId = +req.params.id;
    const review = await db.review.findAll({
      where: { bookId },
      include: [
        {
          model: db.user,
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: db.reply,
          include: [{ model: db.user, attributes: { exclude: ["password"] } }],
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
