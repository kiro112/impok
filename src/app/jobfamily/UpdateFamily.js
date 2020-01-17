'use strict';

const Operation = require('src/app/Operation');

class UpdateFamily extends Operation {

  constructor({ jobFamilyRepository }) {
    super();
    this.jobFamilyRepository = jobFamilyRepository;
  }

  async execute(id, data) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND,
      VALIDATION_ERROR
    } = this.outputs;

    try {
      const family = await this.jobFamilyRepository.update(id, data);
      this.emit(SUCCESS, family);
    } catch(error) {
      switch(error.message) {
      case 'ValidationError':
        return this.emit(VALIDATION_ERROR, error);
      case 'NotFoundError':
        return this.emit(NOT_FOUND, error);
      default:
        this.emit(ERROR, error);
      }
    }
  }

}

UpdateFamily.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR', 'NOT_FOUND']);

module.exports = UpdateFamily;