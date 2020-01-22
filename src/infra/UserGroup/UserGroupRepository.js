'use strict';

const UserGroupMapper = require('./UserGroupMapper');

class UserGroupRepository {

  constructor({ UserGroupModel }) {
    this.UserGroupModel = UserGroupModel;
  }

  async getAll(...args) {
    try {
      const user_groups = await this.UserGroupModel.findAll(...args);
      return user_groups.map(UserGroupMapper.toEntity);
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    const user_group = await this._getById(id);
    return UserGroupMapper.toEntity(user_group);
  }

  async add(user_group) {
    const { valid, errors } = user_group.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;
      throw error;
    }

    const new_user_group = await this.UserGroupModel.create(UserGroupMapper.toDatabase(user_group));
    return UserGroupMapper.toEntity(new_user_group);
  }

  async update(id, newData) {
    const user_group = await this._getById(id);
    const transaction = await this.UserGroupModel.sequelize.transaction();

    try {
      const updated = await user_group.update(newData);
      const newEntity = UserGroupMapper.toEntity(updated);
      
      const { valid, errors } = newEntity.validate();
      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;
        throw error;
      }

      transaction.commit();
      return newEntity;
    } catch(error) {
      transaction.rollback();
      throw error;
    }

  }

  async remove(id) {
    const user_group = await this._getById(id);
    return await user_group.destroy();
  }

  // private
  async _getById(id) {
    try {
      const user_group = await this.UserGroupModel.findByPk(id, { rejectOnEmpty: true });
      return user_group;
    } catch(error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `User group id ${id} can't be found.`;
        throw notFoundError;
      }
      throw error;
    }

  }

}

module.exports = UserGroupRepository;