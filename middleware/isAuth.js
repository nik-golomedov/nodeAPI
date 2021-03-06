const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const db = require("../models");

dotenv.config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Error in auth" });
    }
    const currUser = await db.user.findOne({
      where: { id: user },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    if (!currUser) {
      return res.status(401).json({ message: "User does not exist" });
    }
    req.user = currUser;
    next();
  });
};

module.exports = { authenticateToken };
