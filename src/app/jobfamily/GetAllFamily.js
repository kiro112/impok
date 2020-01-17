'use strict';

const Operation = require('src/app/Operation');

class GetAllJobFamily extends Operation {
  constructor({ jobFamilyRepository }) {
    super();
    this.jobFamilyRepository = jobFamilyRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const job_families = await this.jobFamilyRepository.getAll({
        attributes: ['id', 'family']
      });
    
      this.emit(SUCCESS, job_families);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}


GetAllJobFamily.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllJobFamily;