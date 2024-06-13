'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JewelryColor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JewelryColor.hasMany(models.Product, { foreignKey: 'jewelryColorID' });
    }
  }
  JewelryColor.init({
    jewelryColorID:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    name: {type: DataTypes.STRING,unique:true}
  }, {
    sequelize,
    modelName: 'JewelryColor',
  });
  return JewelryColor;
};