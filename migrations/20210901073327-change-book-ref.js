"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("book", "categoryId", {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: "category",
        key: "id",
        as: "Category",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("book", "categoryId", {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: "category",
        key: "id",
        as: "Category",
      },
    });
  },
};
