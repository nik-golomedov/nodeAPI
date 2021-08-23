const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");

const db = require("../models");
const tokenUsage = require("../middleware/isAuth");

dotenv.config();

registerUser = async (req, res) => {
  try {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const dob = req.body.dob;
    const password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
    const user = await db.user.findOne({ where: { email } });
    if (user !== null) {
      return res.json({ message: "User already exist" });
    }
    db.user.create({ fullName, email, password, dob }).then(() => {
      res.json({ message: "Registration success" });
    });
  } catch (error) {
    res.json(error);
  }
};

getUsers = (req, res) => {
  db.user
    .findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

getProfile = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not found" });
  }
  res.json(req.user);
};

loginUser = async (req, res) => {
  try {
    if (!req.body) return res.status(400).json();
    const email = req.body.email;
    const password = req.body.password;
    const user = await db.user.findOne({ where: { email } });
    if (!user) {
      return res.json({ message: "Enter correct email and/or password" });
    }
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (email === user.email && password === originalPassword) {
      const token = tokenUsage.generateAccessToken(user.id);
      return res.json({ token: token });
    }
    return res.json({ message: "Enter correct email and/or password" });
  } catch (error) {
    res.status(401).json(error);
  }
};

deleteUser = async (req, res) => {
  try {
    const user = await db.user.destroy({ where: { id: req.user.id } });
    res.json({ message: `Delete success` });
  } catch (error) {
    res.json(error);
  }
};

updateUser = async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      user.fullName = req.body.fullName;
      user.email = req.body.email;
      user.dob = req.body.dob;
      user.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();

      try {
        await user.update({
          fullName: user.fullName,
          email: user.email,
          password: user.password,
          dob: user.dob,
        });
        res.json({ message: "Success updated" });
      } catch (error) {
        res.json(error.message);
      }
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  registerUser,
  getUsers,
  getProfile,
  loginUser,
  deleteUser,
  updateUser,
};
