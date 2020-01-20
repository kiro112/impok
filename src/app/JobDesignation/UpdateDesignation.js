'use strict';

const Operation = require('src/app/Operation');

class UpdateDesignation extends Operation {
  constructor({ JobDesignationRepository }) {
    super();
    this.JobDesignationRepository = JobDesignationRepository;
  }

  async execute(id, newData) {
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR,
      NOT_FOUND
    } = this.outputs;

    try {
      const designation = await this.JobDesignationRepository.update(id, newData);
      this.emit(SUCCESS, designation);
    } catch(error) {
      switch(error.message) {
        case 'ValidationError':
          return this.emit(VALIDATION_ERROR, error);
        case 'NotFoundError':
          return this.emit(NOT_FOUND, error);
        default:
          this.emit(ERROR, error);
        }
    }
  }
}

UpdateDesignation.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = UpdateDesignation;