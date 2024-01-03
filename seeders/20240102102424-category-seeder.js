"use strict";

const { query } = require("express");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("categories", [
      {
        name: "Javascript",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "HTML",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "CSS",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Angular",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vuejs",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "MongoDb",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("categories", {}, null);
  },
};
