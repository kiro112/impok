'use strict';

const Operation = require('src/app/Operation');
const JobFamily = require('src/domain/jobfamily/JobFamily');

class CreateFamily extends Operation {

  constructor({ jobFamilyRepository }) {
    super();
    this.jobFamilyRepository = jobFamilyRepository;
  }

  async execute(familyData) {
    const { 
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = this.outputs;

    const family = new JobFamily(familyData);

    try {
      const newFam = await this.jobFamilyRepository.add(family);

      this.emit(SUCCESS, newFam);
    } catch(error) {
      if (error.message == 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }

}

CreateFamily.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateFamily;