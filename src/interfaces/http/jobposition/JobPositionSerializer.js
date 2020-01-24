'use strict';

module.exports = {
  serialize({
    id,
    job_title,
    job_family_id,
    job_designation_id,
    job_role_id,
    job_level_id,
    job_category_id
  }) {
    return {
      id,
      job_title,
      job_family_id,
      job_designation_id,
      job_role_id,
      job_level_id,
      job_category_id
    };
  }
};