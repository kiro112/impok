'use strict';

const Competency = require('src/domain/competency/Competency');

module.exports = {
  toEntity({ dataValues }) {
    const {
      id,
      name,
      description,
      competency_group_id
    } = dataValues;

    return new Competency({
      id,
      name,
      description,
      competency_group_id
    });
  },
  
  toDatabase(survivor) {
    const {
      name,
      description,
      competency_group_id
    } = survivor;

    return {
      name,
      description,
      competency_group_id
    };
  }
};