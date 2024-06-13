'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BraceletSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BraceletSize.hasMany(models.ProductSize, { foreignKey: 'braceletSizeId' });
    }
  }
  BraceletSize.init({
    braceletSizeId:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    size:{type: DataTypes.STRING, allowNull:false}
  }, {
    sequelize,
    modelName: 'BraceletSize',
  });
  return BraceletSize;
};