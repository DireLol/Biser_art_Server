'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JewelryStructure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JewelryStructure.hasMany(models.Product, { foreignKey: 'jewelryStructureId' });
    }
  }
  JewelryStructure.init({
    jewelryStructureId:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
    name: {type: DataTypes.STRING,unique:true}
  }, {
    sequelize,
    modelName: 'JewelryStructure',
  });
  return JewelryStructure;
};