'use strict';

const JobFamilyMapper = require('./SequelizeJobFamilyMapper');

class SequelizeJobFamiliesRepository {
  constructor({ JobFamilyModel }) {
    this.JobFamilyModel = JobFamilyModel;
  }

  async getAll(...args) {
    const job_families = await this.JobFamilyModel.findAll(...args);

    return job_families.map(JobFamilyMapper.toEntity);
  }

  async getById(id) {
    const job_family = await this._getById(id);

    return JobFamilyMapper.toEntity(job_family);
  }

  async add(family) {
    const { valid, errors } = family.validate();

    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const new_job_family = await this.JobFamilyModel.create(JobFamilyMapper.toDatabase(family));
    return JobFamilyMapper.toEntity(new_job_family);
  }

  async update(id, newData) {
    const job_family = await this._getById(id);
    const transaction = await this.JobFamilyModel.sequelize.transaction();

    try {
      const updatedFam = await job_family.update(newData, { transaction });
      const famEntity = JobFamilyMapper.toEntity(updatedFam);

      const { valid, errors } = famEntity.validate();
      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;
  
        throw error;
      }

      await transaction.commit();
      return famEntity;
    } catch(error) {
      await transaction.rollback();
      throw error;
    }

  }


  async remove(id) {
    const job_family = await this._getById(id);

    await job_family.destroy();
    return;
  }

  // Private
  async _getById(id) {
    try {
      return await this.JobFamilyModel.findByPk(id, { rejectOnEmpty: true });
    } catch(error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Job Family with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }

}


module.exports = SequelizeJobFamiliesRepository;