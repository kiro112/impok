'use strict';

const JobCategoryMapper = require('./SequelizeJobCategoryMapper');

class SequelizeJobCategoryRepository {
  
  constructor({ JobCategoryModel }) {
    this.JobCategoryModel = JobCategoryModel;
  }

  async getAll(...args) {
    const job_categories = await this.JobCategoryModel.findAll(...args);
    
    return job_categories.map(JobCategoryMapper.toEntity);
  }

  async getById(id) {
    const job_category = await this._getById(id);
    return JobCategoryMapper.toEntity(job_category);
  }

  async add(data) {
    const { valid, errors } = data.validate();

    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;
      throw error;
    }

    const new_category = await this.JobCategoryModel.create(JobCategoryMapper.toDatabase(data));
    return JobCategoryMapper.toEntity(new_category);
  }

  async update(id, data) {
    const job_category = await this._getById(id);
    const transaction = await this.JobCategoryModel.sequelize.transaction();
    
    try {
      const updatedCategory = await job_category.update(data);
      const jobCategoryEntity = JobCategoryMapper.toEntity(updatedCategory);

      const { valid, errors } = jobCategoryEntity.validate();
      if (!valid) {
        const error = new Error('ValidateError');
        error.details = errors;
        throw error;
      }

      await transaction.commit();
      return jobCategoryEntity;
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  }

  async remove(id) {
    const job_category = await this._getById(id);
    return await job_category.destroy();
  }

  // private
  async _getById(id) {
    try {
      return await this.JobCategoryModel.findByPk(id, { rejectOnEmpty: true });
    } catch(error) {
      console.log('error', error.message);
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Job Category with id ${id} can't be found.`;

        throw notFoundError;
      }
      throw error;
    }

  }

}

module.exports = SequelizeJobCategoryRepository;