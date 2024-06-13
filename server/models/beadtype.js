'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BeadType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BeadType.hasMany(models.Address, { foreignKey: 'beadTypeId' });
    }
  }
  BeadType.init({
    beadTypeId:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true },
    name: {type: DataTypes.STRING,unique:true}
  }, {
    sequelize,
    modelName: 'BeadType',
  });
  return BeadType;
};