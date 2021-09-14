"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reply extends Model {
    static associate(models) {
      Reply.belongsTo(models.review);
      Reply.belongsTo(models.user);
    }
  }
  Reply.init(
    {
      text: DataTypes.TEXT,

      userId: {
        type: DataTypes.INTEGER,
      },
      reviewId: DataTypes.INTEGER,
      bookId: {
        type: DataTypes.INTEGER,
      },
      targetUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "reply",
      freezeTableName: true,
    }
  );
  return Reply;
};
