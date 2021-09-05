const express = require("express");

const ratingController = require("../controllers/ratingController");
const useToken = require("../middleware/isAuth");
const { checkRating } = require("../validation/rating");

const ratingRouter = express.Router();

ratingRouter.post(
  "/",
  useToken.authenticateToken,
  checkRating,
  ratingController.addRating
);
