'use strict';

module.exports = {
  serialize({ id, designation, job_family_id }) {
    return {
      id,
      designation,
      job_family_id
    };
  }
};