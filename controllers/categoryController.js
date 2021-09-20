const db = require("../models");

const addCategory = async (req, res) => {
  try {
    const existCategory = await db.category.findOne({
      where: { value: req.body.category },
    });
    if (existCategory) {
      return res.status(409).json({ message: "Category already exist" });
    }
    const newCategory = await db.category.create({ value: req.body.category });
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getCategories = async (req, res) => {
  try {
    const userCategories = await db.category.findAll({
      attributes: ["value", "id"],
    });
    res.status(200).json(userCategories);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { addCategory, getCategories };
