const express = require("express");

const bookController = require("../controllers/bookController");
const useToken = require("../middleware/isAuth");
const { checkBooks } = require("../validation/book");

const bookRouter = express.Router();

bookRouter.get("/", bookController.getBooks);
bookRouter.post(
  "/",
  useToken.authenticateToken,
  checkBooks,
  bookController.addBook
);
bookRouter.patch("/", useToken.authenticateToken, bookController.editBook);
bookRouter.get("/:id", bookController.getBook);

module.exports = bookRouter;
