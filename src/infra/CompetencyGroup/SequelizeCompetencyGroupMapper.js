'use strict';

const CompetencyGroup = require('src/domain/competencygroup/CompetencyGroup');

module.exports = {
  toEntity({ dataValues }) {
    const {
      id, name, description
    } = dataValues;

    return new CompetencyGroup({
      id, name, description
    });
  },

  toDatabase(survivor) {
    const {
      name, description
    } = survivor;

    return {
      name, description
    };
  }
};