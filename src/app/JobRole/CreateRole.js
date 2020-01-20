'use strict';

const Operation = require('src/app/Operation');
const JobRole = require('src/domain/jobrole/JobRole');

class CreateRole extends Operation {
  constructor({ JobRoleRepository }) {
    super();
    this.JobRoleRepository = JobRoleRepository;
  }

  async execute(data) {
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = this.outputs;

    const role = new JobRole(data);
    try {
      const newRole = await this.JobRoleRepository.add(role);
      this.emit(SUCCESS, newRole);
    } catch(error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
}

CreateRole.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateRole;