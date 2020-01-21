'use strict';

const Operation = require('src/app/Operation');

class UpdateLevel extends Operation {

  constructor({ JobLevelRepository }) {
    super();
    this.JobLevelRepository = JobLevelRepository;
  }

  async execute(id, data) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND,
      VALIDATION_ERROR
    } = this.outputs;

    try {
      const level = await this.JobLevelRepository.update(id, data);
      this.emit(SUCCESS, level);
    } catch(error) {
      switch(error.message) {
        case 'NotFoundError':
          return this.emit(VALIDATION_ERROR, error);
        case 'ValidationError':
          return this.emit(NOT_FOUND, error);
        default:
          this.emit(ERROR, error);
      } 
    }
  }

}

UpdateLevel.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND', 'VALIDATION_ERROR']);

module.exports = UpdateLevel;