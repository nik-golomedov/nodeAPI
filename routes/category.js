const express = require("express");

const categoriesController = require("../controllers/categoryController");
const useToken = require("../middleware/isAuth");
const { checkCategory } = require("../validation/category");

const categoriesRouter = express.Router();

categoriesRouter.post(
  "/",
  useToken.authenticateToken,
  checkCategory,
  categoriesController.addCategory
);
categoriesRouter.get("/", categoriesController.getCategories);

module.exports = categoriesRouter;
