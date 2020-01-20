'use strict';

const Operation = require('src/app/Operation');
const JobDesignation = require('src/domain/jobdesignation/JobDesignation');

class CreateDesignation extends Operation {
  constructor({ JobDesignationRepository }) {
    super();
    this.JobDesignationRepository = JobDesignationRepository;
  }

  async execute(data) {
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = this.outputs;

    const designation = new JobDesignation(data);

    try {
      const newDesignation = await this.JobDesignationRepository.add(designation);
      this.emit(SUCCESS, newDesignation);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }

  }
}

CreateDesignation.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateDesignation;