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
    const first_fam_id = await queryInterface.bulkInsert('job_families', [
      { 
        family: 'Software Engineering',
        created_at: new Date(),
        updated_at: new Date(),
      },
      { 
        family: 'DevOps',
        created_at: new Date(),
        updated_at: new Date(),
      },
      { 
        family: 'UX',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    const job_designations = [];
    for(let i = 0; i < 5; i++) {
      job_designations.push({
        job_family_id: first_fam_id,
        designation: dataFaker.name(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return queryInterface.bulkInsert('job_designations', job_designations, {});
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('job_families', null);
    await queryInterface.bulkDelete('job_designations', null);
    return;
  }
};
