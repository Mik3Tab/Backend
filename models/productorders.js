'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductOrders extends Model {
    static associate(models) {
    }
  }
  ProductOrders.init({
    ProductId: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductOrders',
  });
  return ProductOrders;
};