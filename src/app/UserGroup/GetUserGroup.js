'use strict';

const Operation = require('src/app/Operation');

class GetUserGroup extends Operation {

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
      const userGroup = this.UserGroupRepository.getById(id);
      this.emit(SUCCESS, userGroup);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      this.emit(ERROR, error);
    }
  }
}

GetUserGroup.setOutputs([
  'SUCCESS',
  'ERROR',
  'NOT_FOUND'
]);

module.exports = GetUserGroup;