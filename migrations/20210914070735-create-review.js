module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("review", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.TEXT,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id",
          as: "user",
        },
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: {
          model: "book",
          key: "id",
          as: "book",
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
    await queryInterface.dropTable("review");
  },
};
