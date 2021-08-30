const { Op } = require("sequelize");

const { sequelize } = require("../models");
const db = require("../models");

const addBook = async (req, res) => {
  console.log(req.body);
  try {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const author = req.body.author;
    const snippet = req.body.snippet;
    const image = "http://localhost:8000/" + req.body.header;
    const book = await db.book.findOne({ where: { title } });

    if (book !== null) {
      return res.json({ message: "Book already exist" });
    }
    const newBook = db.book.create({
      title,
      description,
      price,
      author,
      snippet,
      image,
    });
    res.json({ message: "Book successfull added" });
  } catch (error) {
    res.json(error);
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await db.book.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.json(books);
  } catch (err) {
    res.status(401).json({ err });
  }
};

const addReview = async (req, res) => {
  try {
    const text = req.body.text;
    const bookId = +req.body.bookId;
    const userId = +req.body.userId;
    const addBookReview = db.review.create({ text, bookId, userId });
    res.json({ messsage: "success added review" });
  } catch (error) {
    res.json({ messsage: error });
  }
};

const getReview = async (req, res) => {
  try {
    const bookId = +req.params.id;
    const User = db.user;
    console.log(req.params);
    const review = await db.review.findAll({
      where: { bookId },
      include: { model: User, attributes: { exclude: ["password"] } },
    });
    res.json(review);
  } catch (error) {
    res.json({ message: error });
  }
};

const addFavourites = async (req, res) => {
  try {
    const userId = +req.body.userId;
    const bookId = +req.body.bookId;
    const existBook = await db.favourites.findOne({
      where: { userId, bookId },
    });
    if (existBook !== null) {
      await existBook.destroy();
      return res.json({ message: "Successfull removed" });
    }
    const addBookFavourites = await db.favourites.create({ userId, bookId });
    res.json({ message: "Successfull added" });
  } catch (error) {
    res.json({ messsage: error });
  }
};

const getFavourites = async (req, res) => {
  try {
    const userId = +req.params.id;
    const Book = db.book;
    const result = await db.user.findOne({
      where: { id: userId },
      include: Book,
    });
    console.log(result);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};

const addRating = async (req, res) => {
  try {
    const ratingValue = +req.body.value;
    const userId = +req.body.userId;
    const bookId = +req.body.bookId;
    const ratingUser = await db.rating.findOne({ where: { bookId, userId } });
    if (ratingUser) {
      const updatedUser = await ratingUser.update({
        value: ratingValue,
        bookId,
        userId,
      });
    } else {
      const createRating = await db.rating.create({
        value: ratingValue,
        userId,
        bookId,
      });
    }
    const sumRating = await db.rating.sum("value", { where: { bookId } });
    const amountRating = await db.rating.count({
      where: { bookId },
    });
    console.log(sumRating);
    const avgRating = sumRating / amountRating;
    const ratingBook = await db.book.update(
      { rating: avgRating },
      { where: { id: bookId } }
    );

    res.json(amountRating);
  } catch (error) {
    res.json(error);
  }
};

const getRating = async (req, res) => {
  try {
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  addBook,
  getBooks,
  addReview,
  getReview,
  addFavourites,
  getFavourites,
  addRating,
  getRating,
};
