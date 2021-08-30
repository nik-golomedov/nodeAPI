"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.book);
      Review.belongsTo(models.user)
    }
  }
  Review.init(
    {
      text: DataTypes.TEXT,
      bookId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "review",
      freezeTableName: true,
    }
  );
  return Review;
};
