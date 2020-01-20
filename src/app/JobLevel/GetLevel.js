'use strict';

const Operation = require('src/app/Operation');

class GetLevel extends Operation {
  constructor({ JobLevelRepository }) {
    super();
    this.JobLevelRepository = JobLevelRepository;
  }

  async execute(id) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const job_role = await this.JobLevelRepository.getById(id);
      this.emit(SUCCESS, job_role);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }

}

GetLevel.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetLevel;