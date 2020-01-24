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

    const job_family_id = await queryInterface.bulkInsert('job_families', [{
      family: dataFaker.last(),
      created_at: new Date(),
      updated_at: new Date(),
    }], {});

    const job_designation_id = await queryInterface.bulkInsert('job_designations', [{
      job_family_id: job_family_id,
      designation: dataFaker.name(),
      created_at: new Date(),
      updated_at: new Date(),
    }], {});

    const job_role_id = await queryInterface.bulkInsert('job_roles', [{
      role: dataFaker.profession({ rank: true }),
      created_at: new Date(),
      updated_at: new Date(),
    }], {});

    const job_level_id = await queryInterface.bulkInsert('job_levels', [{
      level: dataFaker.profession({ rank: true }),
      created_at: new Date(),
      updated_at: new Date()
    }], {});

    const job_category_id = await queryInterface.bulkInsert('job_categories', [{
      category: dataFaker.profession(),
      created_at: new Date(),
      updated_at: new Date(),
    }], {});

    const job_positions = [];
    for(let i = 0; i < 5; i++) {
      job_positions.push({
        job_title: dataFaker.profession(),
        job_family_id,
        job_designation_id,
        job_level_id,
        job_role_id,
        job_category_id,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return queryInterface.bulkInsert('job_positions', job_positions, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('job_families', null);
    await queryInterface.bulkDelete('job_designations', null);
    await queryInterface.bulkDelete('job_levels', null);
    await queryInterface.bulkDelete('job_roles', null);
    await queryInterface.bulkDelete('job_categories', null);
    return await queryInterface.bulkDelete('job_positions', null);

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
