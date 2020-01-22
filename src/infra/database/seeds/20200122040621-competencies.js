'use strict';

const dataFaker = require('src/infra/support/dataFaker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    
    let group_id = await queryInterface.bulkInsert('competency_groups', [{
      name: dataFaker.animal(),
      description: dataFaker.company(),
      created_at: new Date(),
      updated_at: new Date()
    }], {});

    const competencies = [];
    for(let i = 0; i < 3; i++) {
      competencies.push({
        name: dataFaker.name(),
        description: dataFaker.string(),
        competency_group_id: group_id,
        created_at: new Date(),
        updated_at: new Date()
      });
    }

    return queryInterface.bulkInsert('competencies', competencies, {});
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('competencies', null);
    return queryInterface.bulkDelete('competency_groups', null);
  }
};
