'use strict';

const Operation = require('src/app/Operation');

class DeleteLevel extends Operation {

  constructor({ JobLevelRepository }) {
    this.JobLevelRepository = JobLevelRepository;
  }

  async execute(id) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = this.outputs;

    try {
      await this.JobLevelRepository.remove(Number(id));
      this.emit(SUCCESS);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      return this.emit(ERROR, error);
    }
  }
}

DeleteLevel.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = DeleteLevel;