'use strict';

const Operation = require('src/app/Operation');
const JobLevel = require('src/domain/joblevel/JobLevel');

class CreateLevel extends Operation {

  constructor({ JobLevelRepository }) {
    super();
    this.JobLevelRepository = JobLevelRepository;
  }

  async execute(data) {
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = this.outputs;

    const level = new JobLevel(data);
    try {
      const newLevel = await this.JobLevelRepository.add(level);
      this.emit(SUCCESS, newLevel);
    } catch(error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }

  }

}

CreateLevel.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports =  CreateLevel;