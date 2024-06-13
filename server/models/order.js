'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Каждый заказ может содержать множество продуктов
    Order.belongsToMany(models.Product, { through: 'OrderProduct', foreignKey: 'orderid' });
    Order.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Order.init({
    orderid:{type:DataTypes.INTEGER,primaryKey:true, autoIncrement:true},
    comment:{type: DataTypes.STRING},
    orderStatus:{type: DataTypes.BOOLEAN,defaultValue:true},
    totalCost:{type: DataTypes.DECIMAL, allowNull:false}
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};