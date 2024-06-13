'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CharmSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CharmSize.hasMany(models.ProductSize, { foreignKey: 'charmSizeId' });
    }
  }
  CharmSize.init({
    charmSizeId:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    size:{type: DataTypes.STRING, allowNull:false}
  }, {
    sequelize,
    modelName: 'CharmSize',
  });
  return CharmSize;
};