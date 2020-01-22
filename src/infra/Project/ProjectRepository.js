'use strict';

const ProjectMapper = require('./ProjectMapper');

class ProjectRepository {
  
  constructor({ ProjectModel }) {
    this.ProjectModel = ProjectModel;
  }

  async getAll(...args) {
    try {
      const projects = await this.ProjectModel.findAll(...args);
      return projects.map(ProjectMapper.toEntity);
    } catch(error) {
      throw error;
    }
  }

  async getById(id) {
    const project = await this._getById(id);
    return ProjectMapper.toEntity(project);
  }

  async add(Project) {
    const { valid, errors } = Project.validate();

    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;
      throw error;
    }

    const project = await this.ProjectModel.create(ProjectMapper.toDatabase(Project));
    const projectEntity = ProjectMapper.toEntity(project);

    return projectEntity;
  }

  async update(id, newData) {
    const project = await this._getById(id);
    const transaction = await this.ProjectModel.sequelize.transaction();

    try {
      const updatedProject = await project.update(newData);
      const projectEntity = ProjectMapper.toEntity(updatedProject);

      const { valid, errors } = projectEntity.validate();
      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;
        throw error;
      }

      transaction.commit();
      return projectEntity;
    } catch(error) {
      transaction.rollback();
      throw error;
    }
  }

  async remove(id) {
    const project = await this._getById(id);
    return await project.destroy();
  }


  // private
  async _getById(id) {
    try {
      const project = await this.ProjectModel.findByPk(id, { rejectOnEmpty: true });
      return project;
    } catch(error) {
      if(error.name === 'SequelizeEmptyResultError') {
        const error = new Error('NotFoundError');
        error.details = `Project id ${id} can't be found.`;
        throw error;
      }
      throw error;
    }
  }

}

module.exports = ProjectRepository;