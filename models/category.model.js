"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasOne(models.book);
    }
  }
  Category.init(
    {
      value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "category",
      freezeTableName: true,
    }
  );
  return Category;
};
