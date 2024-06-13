'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Каждый продукт может принадлежать множеству заказов
      Product.belongsToMany(models.Order, { through: 'OrderProduct', foreignKey: 'productId' });
      // Каждый продукт может принадлежать множеству корзин
      Product.belongsToMany(models.Cart, { through: 'CartProduct', foreignKey: 'productId' });

      Product.hasMany(models.ProductInfo, { foreignKey: 'productId' });
      Product.belongsTo(models.JewelryStructure, { foreignKey: 'jewelryStructureId' });
      Product.belongsTo(models.BeadType, { foreignKey: 'beadTypeId' });
      Product.belongsTo(models.JewelryStyle, { foreignKey: 'jewelryStyleId' });
      Product.belongsTo(models.JewelryColor, { foreignKey: 'jewelryColorID' });
      Product.belongsTo(models.ProductType, { foreignKey: 'productTypeId' });
      
    }
  }
  Product.init({
    productId:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type:DataTypes.STRING, unique:true,allowNull:false},
    img:{type: DataTypes.STRING, allowNull:false},
    price:{type: DataTypes.DECIMAL,allowNull:false}
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};