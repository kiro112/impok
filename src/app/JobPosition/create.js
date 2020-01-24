'use strict';

const Operation = require('src/app/Operation');
const JobPosition = require('src/domain/jobposition/JobPosition');

class CreateJobPosition extends Operation {

  constructor({ JobPositionRepository }) {
    super();
    this.JobPositionRepository = JobPositionRepository;
  }

  async execute(data) {
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = this.outputs;

    const job_position = new JobPosition(data);

    try {
      const new_jp = await this.JobPositionRepository.add(job_position);
      this.emit(SUCCESS, new_jp);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }

}

CreateJobPosition.setOutputs([
  'SUCCESS',
  'ERROR',
  'VALIDATION_ERROR'
]);

module.exports = CreateJobPosition;