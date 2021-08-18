const userController = require("../controllers/userController");
const express = require("express");
const userRouter = express.Router();
const useToken = require("../jwt");
const { checkUsers } = require("../validation");
userRouter.get("/", useToken.authenticateToken, userController.getUsers);
userRouter.get("/user", useToken.authenticateToken, userController.getUser);
userRouter.post("/registration", checkUsers, userController.registrationUser);
userRouter.post("/login", userController.loginUser);
userRouter.delete(
  "/user",
  useToken.authenticateToken,
  userController.deleteUser
);
userRouter.put(
  "/user",
  useToken.authenticateToken,
  checkUsers,
  userController.updateUser
);

module.exports = userRouter;
