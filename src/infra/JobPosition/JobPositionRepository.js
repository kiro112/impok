'use strict';

const JobPositionMapper = require('./JobPositionMapper');

class JobPositionRepository {

  constructor({ JobPositionModel }) {
    this.JobPositionModel = JobPositionModel;
  }

  async getAll(...args) {
    try {
      const job_positions = await this.JobPositionModel.findAll(...args);
      return job_positions.map(JobPositionMapper.toEntity);
    } catch(error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const job_position = await this._getById(id);
      return JobPositionMapper.toEntity(job_position);
    } catch(error) {
      throw error;
    }
  }

  async add(JobPosition) {
    const { valid, errors } = JobPosition.validate();

    if (!valid) {
      const ValidationError = new Error('ValidationError');
      ValidationError.details = errors;
      throw ValidationError;
    }

    try {
      const new_jp = await this.JobPositionModel.create(JobPositionMapper.toDatabase(JobPosition));
      return JobPositionMapper.toEntity(new_jp);
    } catch(error) {
      throw error;
    }
  }

  async update(id, newData) {
    const job_position = await this._getById(id);
    const transaction = await this.JobPositionModel.sequelize.transaction();

    try {
      const updated = await job_position.update(newData);
      const jpEntity = JobPositionMapper.toEntity(updated);

      transaction.commit();
      return jpEntity;
    } catch(error) {
      transaction.rollback();
      throw error;
    }
  }

  async remove(id) {
    const job_position = await this._getById(id);
    return await job_position.destroy();
  }

  // private
  async _getById(id) {
    try {
      return await this.JobPositionModel.findByPk(id, { 
        rejectOnEmpty: true,
        attributes: {
          include: [
            'job_family_id',
            'job_designation_id',
            'job_role_id',
            'job_level_id',
            'job_category_id'
          ]
        }
      });
    } catch(error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
              notFoundError.details = `Job Position id ${id} can't be found.`;

        throw notFoundError; 
      }
      throw error;    
    }
  }

}

module.exports = JobPositionRepository;