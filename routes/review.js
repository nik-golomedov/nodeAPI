const express = require("express");

const reviewController = require("../controllers/reviewController");
const useToken = require("../middleware/isAuth");

const reviewRouter = express.Router();

reviewRouter.post("/", useToken.authenticateToken, reviewController.addReview);
reviewRouter.get("/:id", reviewController.getReview);

module.exports = reviewRouter
