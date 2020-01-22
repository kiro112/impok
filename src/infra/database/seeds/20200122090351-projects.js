'use strict';

const dataFaker = require('src/infra/support/dataFaker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const projects = [];
    for(let i = 0; i < 5; i++) {
      projects.push({
        project: dataFaker.animal(),
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    return queryInterface.bulkInsert('projects', projects, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('projects', null);
  }
};
