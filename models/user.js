
const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

const User = sequelize.define("Users", {
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { is:/^\w+\s\w+$/i  },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { args: true, msg: "Valid email required" },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: { args: [6, 256], msg: "String length is not in this range" },
    },
  },
  dob: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});
module.exports = User;
