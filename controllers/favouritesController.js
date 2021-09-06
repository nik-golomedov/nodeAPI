const db = require("../models");

const addFavourite = async (req, res) => {
  try {
    const { bookId } = req.body;
    const newFavouriteBook = await db.favourites.create({
      userId: req.user.id,
      bookId: +bookId,
    });
    res.status(200).json({ message: "Successfull added" });
  } catch (error) {
    res.status(500).json({ messsage: error });
  }
};

const getFavourites = async (req, res) => {
  try {
    const favouriteBooks = await db.user.findOne({
      where: { id: req.user.id },
      include: db.book,
    });
    res.status(200).json(favouriteBooks);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteFavourites = async (req, res) => {
  try {
    const { id } = req.params;
    const existBook = await db.favourites.findOne({
      where: { userId: req.user.id, bookId: +id },
    });
    await existBook.destroy();
    res.status(200).json({ message: "Successfull removed" });
  } catch (error) {
    res.status(500).json({ messsage: error });
  }
};

module.exports = { addFavourite, getFavourites, deleteFavourites };
