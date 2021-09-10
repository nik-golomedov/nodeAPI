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
      Book.belongsTo(models.category);
    }
  }
  Book.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
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
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      snippet: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
