'use strict';

const Operation = require('src/app/Operation');

class UpdateProject extends Operation {

  constructor({ ProjectRepository }) {
    super();
    this.ProjectRepository = ProjectRepository;
  }

  async execute(id, newData) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND,
      VALIDATION_ERROR
    } = this.outputs;

    try {
      const updated = await this.ProjectRepository.update(id, newData);
      this.emit(SUCCESS, updated);
    } catch(error) {
      switch(error.message) {
        case 'NotFoundError':
          return this.emit(NOT_FOUND, error);
        case 'ValidationError':
          return this.emit(VALIDATION_ERROR, error);
        default:
          this.emit(ERROR, error);
      }
    }
  }

}

UpdateProject.setOutputs([
  'SUCCESS',
  'ERROR',
  'NOT_FOUND',
  'VALIDATION_ERROR'
]);

module.exports = UpdateProject;