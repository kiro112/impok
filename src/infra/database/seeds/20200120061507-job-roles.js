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
    const roles = [];
    for(let i = 0; i < 5; i++) {
      roles.push({
        role: dataFaker.profession({ rank: true }),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return queryInterface.bulkInsert('job_roles', roles, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('job_roles', null);
  }
};
