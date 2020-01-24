'use strict';

const JobPosition = require('src/domain/jobposition/JobPosition');

module.exports = {

  toEntity({ dataValues }) {
    const {
      id,
      job_title,
      job_family_id,
      job_designation_id,
      job_role_id,
      job_level_id,
      job_category_id
    } = dataValues;

    return new JobPosition({
      id,
      job_title,
      job_family_id,
      job_designation_id,
      job_role_id,
      job_level_id,
      job_category_id
    });
  },

  toDatabase(survivor) {
    const {
      job_title,
      job_family_id,
      job_designation_id,
      job_role_id,
      job_level_id,
      job_category_id
    } = survivor;

    return {
      job_title,
      job_family_id,
      job_designation_id,
      job_role_id,
      job_level_id,
      job_category_id
    };
  }

};