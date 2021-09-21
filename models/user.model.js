const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.book, {
        through: "favourites",
        foreignKey: "userId",
      });
      User.hasMany(models.review);
      User.hasOne(models.rating);
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { is: /^\w+\s\w+$/i },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: { args: true, msg: "Valid email required" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: { args: [6, 256], msg: "String length is not in this range" },
        },
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user",
      freezeTableName: true,
    },
  );

  return User;
};
