'use strict';

const Operation = require('src/app/Operation');

class GetProject extends Operation {

  constructor({ ProjectRepository }) {
    super();
    this.ProjectRepository = ProjectRepository;
  }

  async execute(id) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = this.outputs;

    try {
      const project = this.ProjectRepository.getById(id);
      this.emit(SUCCESS, project);
    } catch(error) {
      if (error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      this.emit(ERROR, error);
    }
  }

}

GetProject.setOutputs([
  'SUCCESS',
  'ERROR',
  'NOT_FOUND'
]);

module.exports = GetProject;