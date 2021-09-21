const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.book);
      Review.belongsTo(models.user);
      Review.hasMany(models.review);
    }
  }
  Review.init(
    {
      text: DataTypes.TEXT,
      targetUserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bookId: {
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "review",
      freezeTableName: true,
    },
  );
  return Review;
};
