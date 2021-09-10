"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("book", "description", {
      type: Sequelize.TEXT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("book", "description", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
