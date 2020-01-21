'use strict';

const JobLevelMapper = require('./SequelizeJobLevelMapper');

class SequelizeJobLevelRepository {
  constructor({ JobLevelModel }) {
    this.JobLevelModel = JobLevelModel;
  }

  async getAll(...args) {
    const job_levels = await this.JobLevelModel.findAll(...args);
    return job_levels.map(JobLevelMapper.toEntity);
  }

  async getById(id) {
    const job_level = await this._getById(id);
    return JobLevelMapper.toEntity(job_level);
  }

  async add(job_level) {
    const { valid, errors } = job_level.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;
      throw error;
    }

    const new_level = await this.JobLevelModel.create(JobLevelMapper.toDatabase(job_level));
    return JobLevelMapper.toEntity(new_level);
  }

  async update(id, newData) {
    const job_level = await this._getById(id);
    const transaction = await this.JobLevelModel.sequelize.transaction();

    try {
      const updatedRole = await job_level.update(newData);
      const jobLevelEntity = JobLevelMapper.toEntity(updatedRole);

      const { valid, errors } = jobLevelEntity.validate();
      if(!valid) {
        const error = new Error('ValidateError');
        error.details = errrors;
        throw error;
      }

      transaction.commit();
      return jobLevelEntity;
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  }

  async remove(id) {
    const job_level = await this._getById(id);
    return await job_level.destroy();
  }

  // private
  async _getById(id) {
    try {
      return await this.JobLevelModel.findByPk(id, { rejectOnEmpty: true });
    } catch(error) {
      if(error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Job Level with id ${id} can't be found.`;

        throw notFoundError;
      }
      throw error;
    }
  }
}

module.exports = SequelizeJobLevelRepository;