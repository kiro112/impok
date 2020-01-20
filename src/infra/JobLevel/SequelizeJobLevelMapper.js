'use strict';

const JobLevel = require('src/domain/joblevel/JobLevel');

const SequelizeMapper = {
  toEntity({ dataValues }) {
    const { id, level } = dataValues;
    
    return new JobLevel({
      id, level
    });
  },

  toDatabase(survivor) {
    const { level } = survivor;
    return { level };
  }
};

module.exports = SequelizeMapper;