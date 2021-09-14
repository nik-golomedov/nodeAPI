"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("review", "targetUserName", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("review", "targetUserName", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
