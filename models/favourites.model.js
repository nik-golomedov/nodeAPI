const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Favourites extends Model {
    static associate(models) {}
  }
  Favourites.init(
    {
      userId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "favourites",
      freezeTableName: true,
    },
  );
  return Favourites;
};
