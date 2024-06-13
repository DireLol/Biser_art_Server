'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RingSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RingSize.hasMany(models.ProductSize, { foreignKey: 'ringSizeId' });
    }
  }
  RingSize.init({
    ringSizeId:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    size: {type: DataTypes.STRING, allowNull:false}
  }, {
    sequelize,
    modelName: 'RingSize',
  });
  return RingSize;
};