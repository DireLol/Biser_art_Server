'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductInfo.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  ProductInfo.init({
    productId:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    description: {type: DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'ProductInfo',
  });
  return ProductInfo;
};