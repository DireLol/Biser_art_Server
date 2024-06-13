'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      
      productId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      jewelryStructureId: {
        type: Sequelize.DataTypes.INTEGER, allowNull:false,
        references:{
          model:{
            tableName:'jewelryStructures',
        },
        key:'jewelryStructureId'
      },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      beadTypeId: {
        type: Sequelize.DataTypes.INTEGER, allowNull:false,
        references:{
          model:{
            tableName:'beadTypes',
        },
        key:'beadTypeId'
      },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      jewelryStyleId: {
        type: Sequelize.DataTypes.INTEGER, allowNull:false,
        references:{
          model:{
            tableName:'jewelryStyles',
        },
        key:'jewelryStyleId'
      },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      jewelryColorID: {
        type: Sequelize.DataTypes.INTEGER, allowNull:false,
        references:{
          model:{
            tableName:'jewelryColors',
        },
        key:'jewelryColorID'
      },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      productTypeId: {
        type: Sequelize.DataTypes.INTEGER, allowNull:false,
        references:{
          model:{
            tableName:'productTypes',
        },
        key:'productTypeId'
      },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};