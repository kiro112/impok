'use strict';

const Operation = require('src/app/Operation');

class UpdateCategory extends Operation {

  constructor({ JobCategoryRepository }) {
    super();
    this.JobCategoryRepository = JobCategoryRepository;
  }

  async execute(id, data) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND,
      VALIDATION_ERROR
    } = this.outputs;

    try {
      const job_category = await this.JobCategoryRepository.update(id, data);
      this.emit(SUCCESS, job_category);
    } catch(error) {
      switch(error.message) {
        case 'NotFoundError':
          return this.emit(NOT_FOUND, error);
        case 'ValidationError':
          return this.emit(VALIDATION_ERROR, error);
        default:
          this.emit(ERROR, error);
      }
    }
  }
  
}

UpdateCategory.setOutputs([
  'SUCCESS', 'ERROR', 'NOT_FOUND', 'VALIDATION_ERROR'
]);

module.exports = UpdateCategory;