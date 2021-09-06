const CryptoJS = require("crypto-js");
const dotenv = require("dotenv");

const db = require("../models");
const tokenUsage = require("../utils/auth");

dotenv.config();

const registerUser = async (req, res) => {
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
    const newUser = db.user.create({ fullName, email, password, dob });
    res.status(200).json({ message: "Registration success" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await db.user.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(401).json({ err });
  }
};

const getProfile = (req, res) => {
  if (!req.user) {
    return res.status(400).json({ message: "User not found" });
  }
  res.status(200).json(req.user);
};

const loginUser = async (req, res) => {
  try {
    if (!req.body) return res.status(400).json();
    const email = req.body.email;
    const password = req.body.password;
    const user = await db.user.findOne({ where: { email } });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Enter correct email and/or password" });
    }
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (email === user.email && password === originalPassword) {
      const token = tokenUsage.generateAccessToken(user.id);
      return res.json({ token: token });
    }
    return res
      .status(200)
      .json({ message: "Enter correct email and/or password" });
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await db.user.destroy({ where: { id: req.user.id } });
    res.status(200).json({ message: `Delete success` });
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateUser = async (req, res) => {
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
      await user.update({
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        dob: user.dob,
      });
      res.status(200).json({ message: "Success updated" });
    }
  } catch (error) {
    res.status(400).json(error);
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
