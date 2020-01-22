'use strict';

const CompetencyMapper = require('./SequelizeCompetencyMapper');

class SequelizeCompetencyRepository {

  constructor({ CompetencyModel }) {
    this.CompetencyModel = CompetencyModel;
  }

  async getAll(...args) {
    const competencies = await this.CompetencyModel.findAll(...args);
    return competencies.map(CompetencyMapper.toEntity);
  }

  async getById(id) {
    const competency = await this._getById(id);
    return CompetencyMapper.toEntity(competency);
  }

  async add(competency) {
    const { valid, errors } = competency.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;
      throw error;
    }

    const new_competency = await this.CompetencyModel.create(CompetencyMapper.toDatabase(competency));
    return CompetencyMapper.toEntity(new_competency);
  }

  async update(id, newData) {
    const competency = await this._getById(id);
    const transaction = await this.CompetencyModel.sequelize.transaction();

    try {
      const updated = await competency.update(newData);
      const competencyEntity = CompetencyMapper.toEntity(updated);

      const { valid, errors } = competencyEntity.validate();
      if (!valid) {
        const error = new Error('ValidationError');
        error.details = errors;
        throw error;
      }

      await transaction.commit();
      return competencyEntity;
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  }

  async remove(id) {
    const competency = await this._getById(id);
    await competency.destroy();
    return;
  }


  // private
  async _getById(id) {
    try {
      const competency = await this.CompetencyModel.findByPk(id, { 
        rejectOnEmpty: true,
        attributes: {
          include: ['competency_group_id']
        }
      });

      return competency;
    } catch(error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFound = new Error('NotFoundError');
        notFound.details = `Competency id ${id} can't be found.`;
        throw notFound;
      }
      throw error;
    }
  }

}

module.exports = SequelizeCompetencyRepository;