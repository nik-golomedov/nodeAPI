const db = require("../models");

const addRating = async (req, res) => {
  try {
    const ratingValue = +req.body.value;
    const userId = req.user.id;
    const bookId = +req.body.bookId;
    const ratingUser = await db.rating.findOne({ where: { bookId, userId } });
    if (ratingUser) {
      await ratingUser.update({
        value: ratingValue,
      });
    } else {
      await db.rating.create({
        value: ratingValue,
        userId,
        bookId,
      });
    }
    const sumRating = await db.rating.sum("value", { where: { bookId } });
    const amountRating = await db.rating.count({
      where: { bookId },
    });
    const avgRating = sumRating / amountRating;
    await db.book.update(
      { rating: avgRating },
      { where: { id: bookId } },
    );

    res.status(200).json(amountRating);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { addRating };
