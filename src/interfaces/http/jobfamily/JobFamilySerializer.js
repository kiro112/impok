'use strict';

const JobFamilySerializer = {
  serialize({ id, family }) {
    return {
      id,
      family
    };
  }
};

module.exports = JobFamilySerializer;