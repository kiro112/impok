'use strict';

const JobDesignation = require('src/domain/jobdesignation/JobDesignation');

const SequelizeJobDesignationMapper = {
  toEntity({ dataValues }) {
    const { id, designation, job_family_id } = dataValues;

    return new JobDesignation({
      id,
      designation,
      job_family_id
    });
  },

  toDatabase(survivor) {
    const { designation, job_family_id } = survivor;

    return {
      designation,
      job_family_id
    };
  }
};

module.exports = SequelizeJobDesignationMapper;