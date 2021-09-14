"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("reply", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.TEXT,
      },
      targetUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bookId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id",
          as: "user",
        },
      },
      reviewId: {
        type: Sequelize.INTEGER,
        references: {
          model: "review",
          key: "id",
          as: "review",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("reply");
  },
};
