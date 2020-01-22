'use strict';

const CompetencyGroupMapper = require('./SequelizeCompetencyGroupMapper');

class SequelizeCompetencyGroupRepository {

  constructor({ CompetencyGroupModel }) {
    this.CompetencyGroupModel = CompetencyGroupModel;
  }

  async getAll(...args) {
    const competency_groups = await this.CompetencyGroupModel.findAll(...args);
    return competency_groups.map(CompetencyGroupMapper.toEntity);
  }

  async getById(id) {
    const competency_group = await this._getById(id);
    return CompetencyGroupMapper.toEntity(competency_group);
  }

  async add(competency_group) {
    const { valid, errors } = competency_group.validate();
    
    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;
      
      throw error;
    }

    const new_competency_group = await this.CompetencyGroupModel.create(CompetencyGroupMapper.toDatabase(competency_group));
    return CompetencyGroupMapper.toEntity(new_competency_group);
  }

  async update(id, data) {
    const competency_group = await this._getById(id);
    const transaction = await this.CompetencyGroupModel.sequelize.transaction();

    try {
      const updated_competency_group = await competency_group.update(data);
      const compentency_group_entity = CompetencyGroupMapper.toEntity(updated_competency_group); 
      
      transaction.commit();
      return compentency_group_entity;
    } catch(error) {
      transaction.rollback();
      throw error;
    }
  }

  async remove(id) {
    const competency_group = await this._getById(id);
    return await competency_group.destroy();
  }

  // private
  async _getById(id) {
    try {
      return await this.CompetencyGroupModel.findByPk(id, { rejectOnEmpty: true }); 
    } catch(error) {
      if(error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Competency group id ${id} can't be found.`;
        throw notFoundError;
      }
      throw error;
    }
  }

}

module.exports = SequelizeCompetencyGroupRepository;