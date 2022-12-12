/* eslint-disable no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('meetings', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      online: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      local: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      when: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      form: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('meetings');

  }
};
