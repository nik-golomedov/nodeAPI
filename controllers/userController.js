const User = require("../models/user");
const CryptoJS = require("crypto-js");
const tokenUsage = require("../jwt");
const dotenv = require("dotenv");
const validator = require("validator");
const correctName = /^\w+\s\w+$/i;
const validation = require("../validation");

dotenv.config();

exports.registrationUser = async (req, res) => {
  try {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const dob = req.body.dob;
    const password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString();
    const user = await User.findOne({ where: { email } });
    if (user !== null) {
      return res.json({ message: "User already exist" });
    }
    User.create({ fullName, email, password, dob })
      .then(() => {
        res.json({ message: "Registration success" });
      })
  } catch (error) {
    res.json(error);
  }
};

exports.getUsers = (req, res) => {
  User.findAll({
    attributes: {
      exclude: ["id", "createdAt", "updatedAt"],
    },
  }).then((data) => res.json(data));
};

exports.getUser = async (req, res) => {
  res.send(req.user);
};

exports.loginUser = async (req, res) => {
  try {
    if (!req.body) return res.status(400).json();
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ where: { email } });
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

exports.deleteUser = async (req, res) => {
  try {
    if (req.user) {
      await req.user.destroy();
      res.json({ message: "Delete success" });
    }
    return res.status(401).json({ message: "user does not exist" });
  } catch (error) {
    res.json(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    if (!req.body) return res.sendStatus(400).json();
    const user = req.user;
    if (user) {
      if (req.body.fullName) user.fullName = req.body.fullName;
      if (req.body.email) user.email = req.body.email;
      if (req.body.dob) user.dob = req.body.dob;
      if (req.body.password)
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
    return res.json({ message: "User does not exist" });
  } catch (error) {
    res.json(error);
  }
};
