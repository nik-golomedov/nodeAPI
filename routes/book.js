const express = require("express");

const bookController = require("../controllers/bookController");
const useToken = require("../middleware/isAuth");

const bookRouter = express.Router();

bookRouter.get("/", bookController.getBooks);
bookRouter.post("/addbook", useToken.authenticateToken, bookController.addBook);
bookRouter.post("/addreview", useToken.authenticateToken, bookController.addReview);
bookRouter.get("/getreview/:id", bookController.getReview);
bookRouter.post("/addfavourites", useToken.authenticateToken, bookController.addFavourites);
bookRouter.get("/getfavourites/:id", useToken.authenticateToken, bookController.getFavourites);
bookRouter.post("/addrating", useToken.authenticateToken, bookController.addRating);
bookRouter.get("/getrating/:id", bookController.getRating);
bookRouter.post("/addcategory", useToken.authenticateToken, bookController.addCategory);
bookRouter.get("/getcategory", bookController.getCategory);
bookRouter.patch("/editbook", useToken.authenticateToken, bookController.editBook);
bookRouter.get("/:id", bookController.getBook);

module.exports = bookRouter;
