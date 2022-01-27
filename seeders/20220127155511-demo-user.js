'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( 'Users', [
      {
      name: "Miguelito",
      email: "miguel@gmail.com",
      password: "aa123aa",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  }
};
