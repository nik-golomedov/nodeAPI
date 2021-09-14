const express = require("express");

const replyController = require("../controllers/replyController");
const useToken = require("../middleware/isAuth");

const replyRouter = express.Router();

replyRouter.post("/", useToken.authenticateToken, replyController.addReply);

module.exports = replyRouter
