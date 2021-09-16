const express = require("express");

const favouritesController = require("../controllers/favouritesController");
const useToken = require("../middleware/isAuth");

const favouritesRouter = express.Router();

favouritesRouter.post(
  "/",
  useToken.authenticateToken,
  favouritesController.addFavourite,
);

favouritesRouter.get(
  "/",
  useToken.authenticateToken,
  favouritesController.getFavourites,
);

favouritesRouter.delete(
  "/:id",
  useToken.authenticateToken,
  favouritesController.deleteFavourites,
);

module.exports = favouritesRouter;
