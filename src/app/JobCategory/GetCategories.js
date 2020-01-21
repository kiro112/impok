'use strict';

const Operation = require('src/app/Operation');

class GetCategories extends Operation {

  constructor({ JobCategoryRepository }) {
    super();
    this.JobCategoryRepository = JobCategoryRepository;
  }

  async execute() {
    const {
      SUCCESS,
      ERROR
    } = this.outputs;

    try {
      const job_categories = await this.JobCategoryRepository.getAll({
        attributes: ['id', 'category']
      });

      this.emit(SUCCESS, job_categories);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }

}

GetCategories.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetCategories;