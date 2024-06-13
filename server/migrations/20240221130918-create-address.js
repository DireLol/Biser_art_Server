'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Addresses', {
     
      addressId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      streetHouseApartment: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      firstNameLastNameMiddleName: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      mailIndex: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.DataTypes.INTEGER, allowNull:false,
        references:{
          model:{
            tableName:'users',
        },
        key:'userId'
      },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Addresses');
  }
};