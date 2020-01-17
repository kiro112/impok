'use strict';

const JobFamily = require('src/domain/jobfamily/JobFamily');

const SequelizeJobFamilyMapper = {
  
  toEntity({ dataValues }) {
    const { id, family } = dataValues;

    return new JobFamily({
      id,
      family
    });
  },

  toDatabase(survivor) {
    const { family } = survivor;

    return { family };
  }

};


module.exports = SequelizeJobFamilyMapper;