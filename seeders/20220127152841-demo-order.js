'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( 'Orders', [
      {
      status: 'Pending...',
      desc: 'Pedido de tal',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  }
};
