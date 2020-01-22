'use strict';

const Operation = require('src/app/Operation');

class GetProjects extends Operation {

  constructor({ ProjectRepository }) {
    super();
    this.ProjectRepository = ProjectRepository;
  }

  async execute() {
    const {
      SUCCESS,
      ERROR
    } = this.outputs;

    try {
      const projects = this.ProjectRepository.getAll({
        attributes: [
          'id', 'project'
        ]
      });

      this.emit(SUCCESS, projects);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }

}

GetProjects.setOutputs([
  'SUCCESS',
  'ERROR'
]);

module.exports = GetProjects;