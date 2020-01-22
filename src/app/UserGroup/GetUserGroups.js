'use strict';

const Operation = require('src/app/Operation');

class GetUserGroups extends Operation {

  constructor({ UserGroupRepository }) {
    super();
    this.UserGroupRepository = UserGroupRepository;
  }

  async execute() {
    const {
      SUCCESS,
      ERROR
    } = this.outputs;

    try {
      const user_groups = await this.UserGroupRepository.getAll({
        attributes: [
          'id', 'name'
        ]
      });

      this.emit(SUCCESS, user_groups);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }

}

GetUserGroups.setOutputs([
  'SUCCESS',
  'ERROR'
]);

module.exports = GetUserGroups;