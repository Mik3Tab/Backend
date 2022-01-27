'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( 'ProductOrders', [
      {
      ProductId: 1,
      OrderId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  }
};
