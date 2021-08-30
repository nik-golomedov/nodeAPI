"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
        Rating.belongsTo(models.book);
        Rating.belongsTo(models.user)
    }
  }
  Rating.init(
    {
      userId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
      value: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "rating",
      freezeTableName: true,
    }
  );
  return Rating;
};
