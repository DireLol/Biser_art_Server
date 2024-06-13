'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Address.init({
    addressId:{type:DataTypes.INTEGER,primaryKey:true, autoIncrement:true},
    streetHouseApartment:{type:DataTypes.STRING, allowNull: false},
    city:{type:DataTypes.STRING,allowNull: false},
    firstNameLastNameMiddleName:{type: DataTypes.STRING, allowNull:false},
    phone:{type:DataTypes.STRING,allowNull: false},
    mailIndex:{type: DataTypes.INTEGER,allowNull: false}
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};