'use strict';

const Operation = require('src/app/Operation');

class UpdateJobPosition extends Operation {

  constructor({ JobPositionRepository }) {
    super();
    this.JobPositionRepository = JobPositionRepository;
  }

  async execute(id, data) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND,
      VALIDATION_ERROR
    } = this.outputs;

    try {
      const job_position = await this.JobPositionRepository.update(id, data);
      this.emit(SUCCESS, job_position);
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

UpdateJobPosition.setOutputs([
  'SUCCESS',
  'ERROR',
  'NOT_FOUND',
  'VALIDATION_ERROR'
]);

module.exports = UpdateJobPosition;