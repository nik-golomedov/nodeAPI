const express = require("express");

const bookController = require("../controllers/bookController");
const useToken = require("../middleware/isAuth");

const bookRouter = express.Router();

bookRouter.get("/", bookController.getBooks);
bookRouter.post("/addbook", useToken.authenticateToken, bookController.addBook);
bookRouter.post("/addreview", useToken.authenticateToken, bookController.addReview);
bookRouter.get("/getreview/:id", useToken.authenticateToken, bookController.getReview);
bookRouter.post("/addfavourites", useToken.authenticateToken, bookController.addFavourites);
bookRouter.get("/getfavourites/:id", useToken.authenticateToken, bookController.getFavourites);
bookRouter.post("/addrating", useToken.authenticateToken, bookController.addRating);
bookRouter.get("/getrating/:id", useToken.authenticateToken, bookController.getRating);

module.exports = bookRouter;
