'use strict';

const Project = require('src/domain/project/Project');

module.exports = {

  toEntity({ dataValues }) {
    const {
      id, project
    } = dataValues;

    return new Project({
      id, project
    });
  },

  toDatabase(survivor) {
    const { project } = survivor;
    
    return { project };
  }

}