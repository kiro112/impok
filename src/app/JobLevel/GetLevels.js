'use strict';

const Operation = require('src/app/Operation');

class GetLevels extends Operation {

  constructor({ JobLevelRepository }) {
    super();
    this.JobLevelRepository = JobLevelRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const job_levels = await this.JobLevelRepository.getAll({
        attributes: ['id', 'level']
      });

      this.emit(SUCCESS, job_levels);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetLevels.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetLevels;