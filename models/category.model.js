"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
        Category.belongsTo(models.user)
        Category.hasOne(models.book)
    }
  }
  Category.init(
    {
      userId: DataTypes.INTEGER,
      value: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "category",
      freezeTableName: true,
    }
  );
  return Category;
};
