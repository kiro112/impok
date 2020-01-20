'use strict';

const Operation = require('src/app/Operation');

class DeleteRole extends Operation {
  constructor({ JobRoleRepository }) {
    super();
    this.JobRoleRepository = JobRoleRepository;
  }

  async execute(id) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = this.outputs;

    try {
      await this.JobRoleRepository.remove(Number(id));
      this.emit(SUCCESS);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      this.emit(ERROR, error);
    }
  }

}

DeleteRole.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = DeleteRole;