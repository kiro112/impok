'use strict';

const Operation = require('src/app/Operation');

class UpdateUserGroup extends Operation {
  
  constructor({ UserGroupRepository }) {
    super();
    this.UserGroupRepository = UserGroupRepository;
  }

  async execute(id, newData) {
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR,
      NOT_FOUND
    } = this.outputs;

    try {
      const updated = await this.UserGroupRepository.update(id, newData);
      this.emit(SUCCESS, updated);
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

UpdateUserGroup.setOutputs([
  'SUCCESS',
  'ERROR',
  'NOT_FOUND',
  'VALIDATION_ERROR'
]);

module.exports = UpdateUserGroup;