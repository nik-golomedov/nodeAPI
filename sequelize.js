const Sequelize = require("sequelize");
const sequelize = new Sequelize("usersdb", "fusion_intern", "fusion", {
    host: "localhost",
    dialect: "postgres",
  });
  module.exports = sequelize