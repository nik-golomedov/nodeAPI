const express = require("express");

const favouritesController = require("../controllers/favouritesControlle");
const useToken = require("../middleware/isAuth");

const favouritesRouter = express.Router();

favouritesRouter.post(
  "/",
  useToken.authenticateToken,
  favouritesController.addFavourite
);

favouritesRouter.get(
  "/",
  useToken.authenticateToken,
  favouritesController.getFavourites
);
