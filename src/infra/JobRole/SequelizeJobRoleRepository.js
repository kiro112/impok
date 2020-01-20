'use strict';

const JobRoleMapper = require('./SequelizeJobRoleMapper');

class SequelizeJobRoleRepository {

  constructor({ JobRoleModel }) {
    this.JobRoleModel = JobRoleModel;
  }

  async getAll(...args) {
    const job_roles = await this.JobRoleModel.findAll(...args);
    return job_roles.map(JobRoleMapper.toEntity);
  }

  async getById(id) {
    const job_role = await this._getById(id);
    return JobRoleMapper.toEntity(job_role);
  }

  async add(role) {
    const { valid, errors } = role.validate();

    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;
      throw error;
    }

    const new_role = await this.JobRoleModel.create(JobRoleMapper.toDatabase(role));
    return JobRoleMapper.toEntity(new_role);
  }

  async update(id, newData) {
    const job_role = await this._getById(id);
    const transaction = await this.JobRoleModel.sequelize.transaction();

    try {
      const updatedRole = await job_role.update(newData);
      const roleEntity = JobRoleMapper.toEntity(updatedRole);

      const { valid, errors } = roleEntity.validate();
      if (!valid) {
        const error = new Error('ValidateError');
        error.details = errors;
        throw error;
      }

      await transaction.commit();
      return roleEntity;
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  }

  async remove(id) {
    const job_role = await this._getById(id);
    await job_role.destroy();
    return;
  }

  // Private
  async _getById(id) {
    try {
      return await this.JobRoleModel.findByPk(id, { rejectOnEmpty: true });
    } catch(error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Job Role with id ${id} can't be found.`;

        throw notFoundError;
      }
      throw error;
    }
  }

}

module.exports = SequelizeJobRoleRepository;