const { Op } = require("sequelize");
const { sequelize } = require("../models");
const db = require("../models");

const addBook = async (req, res) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const author = req.body.author;
    const snippet = req.body.snippet;
    const image = "http://localhost:8000/" + req.body.header;
    const creator = +req.body.creator;
    const categoryId = req.body.category;
    const book = await db.book.findOne({ where: { title } });
    if (book !== null) {
      return res.json({ message: "Book already exist" });
    }
    const newBook = await db.book.create({
      title,
      description,
      price,
      author,
      snippet,
      image,
      creator,
      categoryId,
    });
    res.json({ message: "Book successfull added" });
  } catch (error) {
    res.json(error);
  }
};

const getBooks = async (req, res) => {
  try {
    const queryParams = {};
    const orderParams = {};
    let page = 0;
    if (req.query.author) {
      queryParams.author = { [Op.substring]: req.query.author };
    }
    if (req.query.order) {
      const order = req.query.order.split("_");
      orderParams.order = order[0];
      orderParams.orderDirection = order[1];
    }
    if (req.query.rating) queryParams.rating ={ [Op.gte]: req.query.rating};
    if (req.query.price) {
      queryParams.price = { [Op.between]: req.query.price };
    }
    if (req.query.category) queryParams.categoryId = +req.query.category;
    if (req.query.page) page = req.query.page;
    const books = await db.book.findAndCountAll({
      include: [{ model: db.category, attributes: ["value"] }],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      where: { ...queryParams },
      offset: page * 8,
      limit: 8,
      order: orderParams.order && [
        [orderParams.order, orderParams.orderDirection],
      ],
    });
    console.log(page)
    res.json({ books: books.rows, total: books.count });
  } catch (err) {
    res.status(401).json({ err });
  }
};

const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const selectedBook = await db.book.findOne({
      include: [{ model: db.category, attributes: ["value"] }],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      where: { id: +id },
    });
    res.json(selectedBook);
  } catch (error) {
    res.json(error);
  }
};

const addReview = async (req, res) => {
  try {
    const text = req.body.text;
    const bookId = +req.body.bookId;
    const userId = +req.body.userId;
    const addBookReview = await db.review.create({ text, bookId, userId });
    res.json({ messsage: "success added review" });
  } catch (error) {
    res.json({ messsage: error });
  }
};

const getReview = async (req, res) => {
  try {
    const bookId = +req.params.id;
    const User = db.user;
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
        value: ratingValue
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

const addCategory = async (req, res) => {
  try {
    const value = req.body.category;
    const existCategory = await db.category.findOne({
      where: { value },
    });
    if (existCategory) {
      return res.json({ message: "Category already exist" });
    }
    const addCategory = await db.category.create({ value });
    res.json(addCategory);
  } catch (error) {
    res.json(error);
  }
};

const getCategory = async (req, res) => {
  try {
    const userCategories = await db.category.findAll({
      attributes: ["value", "id"],
    });
    
    console.log( await db.category.findAll())
    res.json(userCategories);
  } catch (error) {
    res.json(error);
  }
};

const editBook = async (req, res) => {
  try {
    const userId = +req.body.userId;
    const bookId = +req.body.bookId;
    const snippet = req.body.snippet;
    const price = req.body.price;
    const description = req.body.description;
    const editedBook = await db.book.findOne({
      where: { id: bookId, creator: userId },
    });
    return await editedBook.update({ snippet, price, description });
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  addBook,
  getBooks,
  getBook,
  addReview,
  getReview,
  addFavourites,
  getFavourites,
  addRating,
  getRating,
  addCategory,
  getCategory,
  editBook,
};
