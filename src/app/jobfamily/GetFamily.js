'use strict';

const Operation = require('src/app/Operation');

class GetFamily extends Operation {
  constructor({ jobFamilyRepository }) {
    super();
    this.jobFamilyRepository = jobFamilyRepository;
  }

  async execute(id) {
    const { SUCCESS, NOT_FOUND } = this.outputs;
    
    try {
      const job_family = await this.jobFamilyRepository.getById(id);
      
      this.emit(SUCCESS, job_family);
    } catch(error) {

      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetFamily.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetFamily;