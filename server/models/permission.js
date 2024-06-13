'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permission.hasMany(models.User, { foreignKey: 'permissionId' });
    }
  }
  Permission.init({
    permissionId:{type:DataTypes.INTEGER,primaryKey:true, autoIncrement:true},
    permissionName:{type:DataTypes.STRING, allowNull:false, defaultValue:"USER"}
  }, {
    sequelize,
    modelName: 'Permission',
  });
  module.exports = Permission;