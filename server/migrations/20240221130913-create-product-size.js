'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductSizes', {
      
      productSizeId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      },
      figurineSizeId: {
        type: Sequelize.DataTypes.INTEGER, allowNull:false,
        references:{
          model:{
            tableName:'figurineSizes',
        },
        key:'figurineSizeId'
      },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      jevelrySizeId: {
        type: Sequelize.DataTypes.INTEGER, allowNull:false,
        references:{
          model:{
            tableName:'jevelrySizes',
        },
        key:'jevelrySizeId'
      },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ringSizeId: {
        type: Sequelize.DataTypes.INTEGER, allowNull:false,
        references:{
          model:{
            tableName:'ringSizes',
        },
        key:'ringSizeId'
      },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      charmSizeId: {
        type: Sequelize.DataTypes.INTEGER, allowNull:false,
        references:{
          model:{
            tableName:'charmSizes',
        },
        key:'charmSizeId'
      },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      earringSizeId: {
        type: Sequelize.DataTypes.INTEGER, allowNull:false,
        references:{
          model:{
            tableName:'earingSizes',
        },
        key:'earringSizeId'
      },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      broochSizeId: {
        type: Sequelize.DataTypes.INTEGER, allowNull:false,
        references:{
          model:{
            tableName:'broochSizes',
        },
        key:'broochSizeId'
      },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      braceletSizeId: {
        type: Sequelize.DataTypes.INTEGER, allowNull:false,
        references:{
          model:{
            tableName:'braceletSizes',
        },
        key:'braceletSizeId'
      },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ProductSizes');
  }
};