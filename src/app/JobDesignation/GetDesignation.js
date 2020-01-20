'use strict';

const Operation = require('src/app/Operation');

class GetDesignation extends Operation {
  constructor({ JobDesignationRepository }) {
    super();
    this.JobDesignationRepository = JobDesignationRepository;
  }

  async execute(id) {
    const {
      SUCCESS,
      NOT_FOUND
    } = this.outputs;

    try {
      const job_designation = await this.JobDesignationRepository.getById(id);

      this.emit(SUCCESS, job_designation);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetDesignation.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetDesignation;