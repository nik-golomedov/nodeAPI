const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.hasMany(models.review);
      Book.belongsToMany(models.user, {
        through: "favourites",
        foreignKey: "bookId",
      });
      Book.hasMany(models.rating);
    }
  }
  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      snippet: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "book",
      freezeTableName: true,
    }
  );
  return Book;
};
