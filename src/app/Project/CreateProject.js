'use strict';

const Operation = require('src/app/Operation');
const Project = require('src/domain/project/Project');

class CreateProject extends Operation {

  constructor({ ProjectRepository }) {
    super();
    this.ProjectRepository = ProjectRepository;
  }

  async execute(data) {
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = this.outputs;

    const project = new Project(data);
    try {
      const new_project = await this.ProjectRepository.add(project);
      this.emit(SUCCESS, new_project);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }

  }

}

CreateProject.setOutputs([
  'SUCCESS',
  'ERROR',
  'NOT_FOUND',
  'VALIDATION_ERROR'
]);

module.exports = CreateProject;