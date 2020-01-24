'use strict';

const Operation = require('src/app/Operation');

class DeleteJobPosition extends Operation {

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
      await this.JobPositionRepository.remove(id);
      this.emit(SUCCESS);
    } catch(error) {
      if (error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      this.emit(ERROR, error);
    }
  }

}

DeleteJobPosition.setOutputs([
  'SUCCESS',
  'ERROR',
  'NOT_FOUND'
]);

module.exports = DeleteJobPosition;