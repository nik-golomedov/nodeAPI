const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("./models/user");

dotenv.config();

const generateAccessToken = (name, res) => {
  const token = jwt.sign(name, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
  });
  return token;
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.TOKEN_SECRET, async(err, user) => {
    if (err) return res.sendStatus(401);
    req.user = await User.findOne({ where: { id: user }, attributes: {exclude: ["createdAt", "updatedAt"] } } );
    next();
  });
};

module.exports = { generateAccessToken, authenticateToken };
