'use strict';

const Operation = require('src/app/Operation');

class GetCategory extends Operation {

  constructor({ JobCategoryRepository }) {
    super();
    this.JobCategoryRepository = JobCategoryRepository;
  }

  async execute(id) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = this.outputs;

    try {
      const job_category = await this.JobCategoryRepository.getById(id);
      this.emit(SUCCESS, job_category);
    } catch(error) {
      if (error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      this.emit(ERROR, error);
    }
  }

};

GetCategory.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetCategory;