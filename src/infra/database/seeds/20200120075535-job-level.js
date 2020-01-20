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
    const job_levels = [];
    for(let i = 0; i < 5; i++) {
      job_levels.push({
        level: dataFaker.profession({ rank: true }),
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    return queryInterface.bulkInsert('job_levels', job_levels, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('job_levels', null);
  }
};
