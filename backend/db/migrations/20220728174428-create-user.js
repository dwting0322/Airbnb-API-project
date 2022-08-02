"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", { // it was return not await
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true
      },
      token: {
        type: Sequelize.STRING,
        unique: true
      },
      hashedPassword: {
        type: Sequelize.STRING.BINARY,
        allowNull: false
      },
     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('Users', ['username', 'email'], { unique: true });

  },
  

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users"); // it was return not await
  }
};