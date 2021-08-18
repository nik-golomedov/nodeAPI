const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config();

const generateAccessToken = (name, res) => {
  const token = jwt.sign(name, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
  });
  return token;
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json();
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json();
    const currUser =  await User.findOne({
      where: { id: user },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!currUser) {
      return res.status(401).json({message:"User does not exist"})
    }
    req.user = currUser
    next();
  });
};

module.exports = { generateAccessToken, authenticateToken };
