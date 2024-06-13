'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Каждый пользователь может иметь много адресов
      User.hasMany(models.Address, { foreignKey: 'userId' });
      User.hasMany(models.Token, { foreignKey: 'userId' });
      User.hasOne(models.Cart, { foreignKey: 'userId' })
      User.belongsTo(models.Permission, { foreignKey: 'permissionId' });
      User.hasMany(models.Order, { foreignKey: 'userId' });
    }
  }
  User.init({
    userId:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement: true},
    username:{type:DataTypes.STRING, unique:true},
    password:{type:DataTypes.STRING},
    email:{type: DataTypes.STRING, unique:true},
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING},
  
  }, {
    sequelize,
    modelName: 'User',
  });

module.exports = User;