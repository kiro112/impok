'use strict';

const Operation = require('src/app/Operation');
const JobCategory = require('src/domain/jobcategory/JobCategory');

class CreateCategory extends Operation {

  constructor({ JobCategoryRepository }) {
    super();
    this.JobCategoryRepository = JobCategoryRepository;
  }

  async execute(data) {
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = this.outputs;

    const job_category = new JobCategory(data);
    try {
      const new_category = await this.JobCategoryRepository.add(job_category);
      this.emit(SUCCESS, new_category);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
  
}

CreateCategory.setOutputs([
  'SUCCESS', 'ERROR', 'VALIDATION_ERROR'
]);

module.exports = CreateCategory;