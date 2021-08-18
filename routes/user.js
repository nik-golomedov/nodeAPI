const userController = require("../controllers/userController");
const express = require("express");
const userRouter = express.Router();
const useToken = require("../middleware/isAuth");
const { checkUsers } = require("../validation/user");
userRouter.get("/", useToken.authenticateToken, userController.getUsers);
userRouter.get("/:id", useToken.authenticateToken, userController.getUser);
userRouter.post("/registration", checkUsers, userController.registrationUser);
userRouter.post("/login", userController.loginUser);
userRouter.delete(
  "/",
  useToken.authenticateToken,
  userController.deleteUser
);
userRouter.put(
  "/",
  useToken.authenticateToken,
  checkUsers,
  userController.updateUser
);

module.exports = userRouter;
