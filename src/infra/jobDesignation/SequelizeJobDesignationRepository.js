'use strict';

const JobDesignationMapper = require('./SequelizeJobDesignationMapper');

class SequelizeJobDesignationRepository {
  constructor({ JobDesignationModel }) {
    this.JobDesignationModel = JobDesignationModel;    
  }

  async getAll(...args) {
    const job_designations = await this.JobDesignationModel.findAll(...args);

    return job_designations.map(JobDesignationMapper.toEntity);
  }

  async getById(id) {
    const job_designation = await this._getById(id);

    return JobDesignationMapper.toEntity(job_designation);
  }

  async add(designation) {
    const { valid, errors } = designation.validate();

    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;
      throw error;
    }

    const new_job_designation = await this.JobDesignationModel.create(JobDesignationMapper.toDatabase(designation));
    return JobDesignationMapper.toEntity(new_job_designation);
  }

  async update(id, newData) {
    const job_designation = await this._getById(id);
    const transaction = await this.JobDesignationModel.sequelize.transaction();

    try {
      const updatedDesignation = await job_designation.update(newData, { transaction });
      const designationEntity = JobDesignationMapper.toEntity(updatedDesignation);

      const { valid, errors } = designationEntity.validate();
      if(!valid) {
        const error = new Error('ValidateError');
        error.details = errors;
        throw error;
      }

      await transaction.commit();
      return designationEntity;
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  }

  async remove(id) {
    const job_designation = await this._getById(id);
    await job_designation.destroy();
    return;
  }



  // private
  async _getById(id) {
    try {
      return await this.JobDesignationModel.findByPk(id, { 
        rejectOnEmpty: true,
        attributes: {
          include: ['job_family_id']
        } 
      });
    } catch(error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Job Designation with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }

}

module.exports = SequelizeJobDesignationRepository;