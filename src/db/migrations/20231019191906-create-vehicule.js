'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vehicules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      immatriculation_vehicule: {
        type: Sequelize.STRING
      },
      puissance: {
        type: Sequelize.INTEGER
      },
      couleur: {
        type: Sequelize.STRING
      },
      marque: {
        type: Sequelize.STRING
      },
      annee_mise_en_circulation: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vehicules');
  }
};
