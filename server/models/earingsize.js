'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EaringSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      EaringSize.hasMany(models.ProductSize, { foreignKey: 'earringSizeId' });
    }
  }
  EaringSize.init({
    earringSizeId:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    size:{type: DataTypes.STRING, allowNull:false}
  }, {
    sequelize,
    modelName: 'EaringSize',
  });
  return EaringSize;
};