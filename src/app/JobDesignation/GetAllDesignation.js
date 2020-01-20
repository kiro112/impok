'use strict';

const Operation = require('src/app/Operation');

class GetAllDesignation extends Operation {
  constructor({ JobDesignationRepository }) {
    super();
    this.JobDesignationRepository = JobDesignationRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const job_designations = await this.JobDesignationRepository.getAll({
        attributes: ['id', 'designation', 'job_family_id']
      });

      this.emit(SUCCESS, job_designations);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }

}

GetAllDesignation.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllDesignation;