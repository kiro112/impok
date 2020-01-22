'use strict';

const Operation = require('src/app/Operation');

class DeleteUserGroup extends Operation {

  constructor({ UserGroupRepository }) {
    super();
    this.UserGroupRepository = UserGroupRepository;
  }

  async execute(id) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = this.outputs;

    try {
      await this.UserGroupRepository.remove(id);
      this.emit(SUCCESS);
    } catch(error) {
      if (error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      this.emit(ERROR, error);
    }
  }

}

DeleteUserGroup.setOutputs([
  'SUCCESS',
  'ERROR',
  'NOT_FOUND'
]);

module.exports = DeleteUserGroup;