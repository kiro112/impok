'use strict';

const Operation = require('Operation');

class DeleteProject extends Operation {

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
      await this.ProjectRepository.remove(id);
      this.emit(SUCCESS);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      this.emit(ERROR, error);
    }

  }

}

DeleteProject.setOutputs([
  'SUCCESS',
  'ERROR',
  'NOT_FOUND'
]);

module.exports = DeleteProject;