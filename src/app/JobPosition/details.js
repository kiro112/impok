'use strict';

const Operation = require('src/app/Operation');

class GetJobPosition extends Operation {

  constructor({ JobPositionRepository }) {
    super();
    this.JobPositionRepository = JobPositionRepository;
  }

  async execute(id) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = this.outputs;

    try {
      const job_position = await this.JobPositionRepository.getById(id);
      this.emit(SUCCESS, job_position);
    } catch(error) {
      if (error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      this.emit(ERROR, error);
    }
  }

}

GetJobPosition.setOutputs([
  'SUCCESS',
  'ERROR',
  'NOT_FOUND'
]);

module.exports = GetJobPosition;