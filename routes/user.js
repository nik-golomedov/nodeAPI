const express = require("express");

const userController = require("../controllers/userController");
const useToken = require("../middleware/isAuth");
const { checkUsers } = require("../validation/user");

const userRouter = express.Router();

// userRouter.get("/", useToken.authenticateToken, userController.getUsers);
userRouter.get("/", useToken.authenticateToken, userController.getProfile);
userRouter.post("/registration", checkUsers, userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.delete("/", useToken.authenticateToken, userController.deleteUser);
userRouter.put(
  "/",
  useToken.authenticateToken,
  checkUsers,
  userController.updateUser
);

module.exports = userRouter;
