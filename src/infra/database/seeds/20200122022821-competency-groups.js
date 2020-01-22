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
    const groups = [];
    for(let i = 0; i < 5; i++) {
      groups.push({
        name: dataFaker.animal(),
        description: dataFaker.string(),
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    return queryInterface.bulkInsert('competency_groups', groups, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('competency_groups', null);
  }
};
