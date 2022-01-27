'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( 'Products', [
      {
      name: 'TKL PBT azeez',
      price: 180,
      CategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Alpaca freez',
      price: 120,
      CategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Keycult Keyboard',
      price: 270,
      CategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Tofe60 keyboard',
      price: 70,
      CategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Mastodon 900kb',
      price: 380,
      CategoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  }

};
