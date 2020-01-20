'use strict';

const JobRole = require('src/domain/jobrole/JobRole');

const SequelizeJobRoleMapper = {
  toEntity({ dataValues }) {
    const {
      id,
      role
    } = dataValues;

    return new JobRole({
      id,
      role
    });
  },
  
  toDatabase(survivor) {
    const {
      role
    } = survivor;

    return { role };
  }
};

module.exports = SequelizeJobRoleMapper;