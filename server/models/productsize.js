'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductSize.belongsTo(models.ProductType, { foreignKey: 'productTypeId' });
      ProductSize.belongsTo(models.JevelrySize, { foreignKey: 'jevelrySizeId' });
      ProductSize.belongsTo(models.FigurineSize, { foreignKey: 'figurineSizeId' });
      ProductSize.belongsTo(models.RingSize, { foreignKey: 'ringSizeId' });
      ProductSize.belongsTo(models.CharmSize, { foreignKey: 'charmSizeId' });
      ProductSize.belongsTo(models.EaringSize, { foreignKey: 'earringSizeId' });
      ProductSize.belongsTo(models.BroochSize, { foreignKey: 'broochSizeId' });
      ProductSize.belongsTo(models.BraceletSize, { foreignKey: 'braceletSizeId' });
    }
  }
  ProductSize.init({
    productSizeId:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}
  }, {
    sequelize,
    modelName: 'ProductSize',
  });
  return ProductSize;
};