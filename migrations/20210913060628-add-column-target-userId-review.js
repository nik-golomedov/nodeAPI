"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("review", "targetUserId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("review", "targetUserId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
};
