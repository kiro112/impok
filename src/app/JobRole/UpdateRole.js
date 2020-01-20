'use strict';

const Operation = require('src/app/Operation');

class UpdateRole extends Operation {
  constructor({ JobRoleRepository }) {
    super();
    this.JobRoleRepository = JobRoleRepository;
  }

  async execute(id, data) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND,
      VALIDATION_ERROR
    } = this.outputs;

    try {
      const role = await this.JobRoleRepository.update(id, data);
      this.emit(SUCCESS, role);
    } catch(error) {
      switch(error.message) {
        case 'ValidationError':
          return this.emit(VALIDATION_ERROR, error);
        case 'NotFoundError':
          return this.emit(NOT_FOUND, error);
        default:
          this.emit(ERROR, error);
      }
    }

  }
}

UpdateRole.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND', 'VALIDATION_ERROR']);

module.exports = UpdateRole;