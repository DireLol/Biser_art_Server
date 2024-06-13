'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JewelryStyle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JewelryStyle.hasMany(models.Product, { foreignKey: 'jewelryStyleId' });
    }
  }
  JewelryStyle.init({
    jewelryStyleId:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING,unique:true}
  }, {
    sequelize,
    modelName: 'JewelryStyle',
  });
  return JewelryStyle;
};