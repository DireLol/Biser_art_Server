'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CartProduct.init({
    cartProductId: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    quantity: {type: DataTypes.INTEGER, allowNull:false}
  }, {
    sequelize,
    modelName: 'CartProduct',
  });
  return CartProduct;
};