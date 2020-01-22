'use strict';

const Operation = require('src/app/Operation');
const UserGroup = require('src/domain/usergroup/UserGroup');

class CreateUserGroup extends Operation {

  constructor({ UserGroupRepository }) {
    super();
    this.UserGroupRepository = UserGroupRepository;
  }

  async execute(userGroup) {
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = this.outputs;

    const user_group = new UserGroup(userGroup);
    try {
      const new_user_group = await this.UserGroupRepository.add(user_group);
      this.emit(SUCCESS, new_user_group);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
}

CreateUserGroup.setOutputs([
  'SUCCESS',
  'ERROR',
  'VALIDATION_ERROR'
]);

module.exports = CreateUserGroup;