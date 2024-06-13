'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BroochSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BroochSize.hasMany(models.ProductSize, { foreignKey: 'broochSizeId' });
    }
  }
  BroochSize.init({
    broochSizeId:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    size:{type: DataTypes.STRING, allowNull:false}
  }, {
    sequelize,
    modelName: 'BroochSize',
  });
  return BroochSize;
};