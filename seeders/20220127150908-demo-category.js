'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( 'Categories', [
      {
      name: 'Teclados',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Switches',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Stabilizers',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Keycaps',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  }
};
