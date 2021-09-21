const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {}
  }
  Notification.init(
    {
      bookId: DataTypes.INTEGER,
      message: DataTypes.STRING,
      type: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "notification",
      freezeTableName: true,
    },
  );
  return Notification;
};
