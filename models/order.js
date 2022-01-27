'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Product, {through: 'ProductOrders', as: 'products', foreignKey: 'OrderId'});
      Order.belongsTo(models.User); 
    }
  }
  Order.init({
    status: DataTypes.STRING,
    desc: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};