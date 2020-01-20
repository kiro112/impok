'use strict';

const Operation = require('src/app/Operation');

class GetRole extends Operation {
  constructor({ JobRoleRepository }) {
    super();
    this.JobRoleRepository = JobRoleRepository;
  }

  async execute(id) {
    const {
      SUCCESS,
      NOT_FOUND
    } = this.outputs;

    try {
      const job_role = await this.JobRoleRepository.getById(id);
      this.emit(SUCCESS, job_role);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetRole.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetRole;