'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // return Promise.all([
    //   queryInterface.changeColumn("book", "snippet", {
    //     type: Sequelize.STRING,
    //     allowNull: true,
    //   }),
    // ]);
  },

  down: async (queryInterface, Sequelize) => {
    // return Promise.all([
    //   queryInterface.changeColumn("book", "snippet", {
    //     type: Sequelize.TEXT,
    //     allowNull: true,
    //   }),
    // ]);
}

}