'use strict';

const Operation = require('src/app/Operation');

class UpdateCompetency extends Operation {

  constructor({ CompetencyRepository }) {
    super();
    this.CompetencyRepository = CompetencyRepository;
  }

  async execute(id, newData) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND,
      VALIDATION_ERROR
    } = this.outputs;

    try {
      const updated = await this.CompetencyRepository.update(id, newData);
      this.emit(SUCCESS, updated);
    } catch(error) {
      switch(error.message) {
        case 'NotFound':
          return this.emit(NOT_FOUND, error);
        case 'ValidationError':
          return this.emit(VALIDATION_ERROR, error);
        default:
          this.emit(ERROR, error);
      }
    }

  }

}

UpdateCompetency.setOutputs([
  'SUCCESS',
  'ERROR',
  'NOT_FOUND',
  'VALIDATION_ERROR'
]);

module.exports = UpdateCompetency;