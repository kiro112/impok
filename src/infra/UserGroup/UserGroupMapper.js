'use strict';

const UserGroup = require('src/domain/usergroup/UserGroup');

module.exports = {

  toEntity({ dataValues }) {
    const {
      id, name
    } = dataValues;

    return new UserGroup({ 
      id, 
      name 
    });
  },

  toDatabase(survivor) {
    const { name } = survivor;

    return { name };
  }

};