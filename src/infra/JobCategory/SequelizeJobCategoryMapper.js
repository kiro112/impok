'use strict';

const JobCategory = require('src/domain/jobcategory/JobCategory');

module.exports = {
  toEntity({ dataValues }) {
    const { id, category } = dataValues;

    return new JobCategory({
      id,
      category
    });
  },

  toDatabase(survivor) {
    const { category } = survivor;
    return { category };
  }
};