const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateAccessToken = (name) => {
  const token = jwt.sign(name, process.env.TOKEN_SECRET, {
    algorithm: "HS256",
  });
  return token;
};

module.exports = { generateAccessToken };
