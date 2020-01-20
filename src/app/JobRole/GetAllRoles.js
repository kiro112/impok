'use strict';

const Operation = require('src/app/Operation');

class GetAllRoles extends Operation {
  constructor({ JobRoleRepository }) {
    super();
    this.JobRoleRepository = JobRoleRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const job_roles = await this.JobRoleRepository.getAll({
        attributes: [ 'id', 'role' ]
      });

      this.emit(SUCCESS, job_roles);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

Operation.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllRoles;