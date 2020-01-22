'use strict';

const UserGroupSerializer = {
  serialize({ id, name }) {
    return { id, name }
  }
};

module.exports = UserGroupSerializer;