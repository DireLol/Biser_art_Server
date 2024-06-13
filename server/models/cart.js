'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     // Каждая корзина может содержать множество продуктов
    Cart.belongsToMany(models.Product, { through: 'CartProduct', foreignKey: 'cartId' });
    Cart.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Cart.init({
    cartId:{type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true}
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};