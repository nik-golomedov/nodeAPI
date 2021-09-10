const { Op } = require("sequelize");

const db = require("../models");
const app = require("../index");

const addBook = async (req, res) => {
  try {
    const { title, description, price, author, snippet, category, creatorId } =
      req.body;
    const image = req.body.header
      ? "http://localhost:8000/" + req.body.header
      : "http://localhost:8000/placeholder.png";
    const book = await db.book.findOne({ where: { title } });
    if (book !== null) {
      return res.status(409).json({ message: "Book already exist" });
    }
    const newBook = await db.book.create({
      title,
      description,
      price,
      author,
      snippet,
      image,
      creatorId,
      categoryId: category,
    });
    if (app.emitter) app.emitter.emit("newEvent", newBook);
    res.status(200).json({ message: "Book successfull added" });
  } catch (error) {
    res.status(500).json(error);
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
    if (req.query.rating) queryParams.rating = { [Op.gte]: req.query.rating };
    if (req.query.price) {
      const correctPrice = req.query.price.split(",");
      queryParams.price = { [Op.between]: correctPrice };
    }
    if (req.query.category) queryParams.categoryId = +req.query.category;
    if (req.query.page) page = req.query.page;
    const books = await db.book.findAndCountAll({
      include: [
        {
          model: db.category,
          attributes: ["value"],
          required: true,
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      where: { ...queryParams },
      offset: page * 8,
      limit: 8,
      order: orderParams.order
        ? [[orderParams.order, orderParams.orderDirection]]
        : [["createdAt", "ASC"]],
    });
    res.status(200).json({ books: books.rows, total: books.count });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedBook = await db.book.findOne({
      include: [
        {
          model: db.category,
          attributes: ["value"],
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId"],
      },
      where: { id: +id },
    });
    if (app.emitter) app.emitter.emit("newEvent", selectedBook);
    res.status(200).json(selectedBook);
  } catch (error) {
    res.status(500).json(error);
  }
};

const editBook = async (req, res) => {
  try {
    const { snippet, price, description, bookId } = req.body;
    const editedBook = await db.book.findOne({
      where: { id: +bookId, creatorId: req.user.id },
    });
    await editedBook.update({ snippet, price, description });
    return res.status(200).json({ message: "Edit success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addBook,
  getBooks,
  getBook,
  editBook,
};
