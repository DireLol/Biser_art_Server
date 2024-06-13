'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

  class Token extends Model {
    static associate(models) {
      // Описываем ассоциации с другими моделями здесь, если они есть
      Token.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Token.init({
    idToken: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.STRING, allowNull: false },
    deviceInfo: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    modelName: 'Token',
  });
  module.exports = Token;