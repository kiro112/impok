'use strict';

const Operation = require('src/app/Operation');

class GetCompetency extends Operation {
  
  constructor({ CompetencyRepository }) {
    super();
    this.CompetencyRepository = CompetencyRepository;
  }

  async execute(id) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = this.outputs;

    try {
      const competency = await this.CompetencyRepository.getById(id);
      this.emit(SUCCESS, competency);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      this.emit(ERROR, error);
    }
  }

}

GetCompetency.setOutputs([
  'SUCCESS',
  'ERROR',
  'NOT_FOUND'
]);

module.exports = GetCompetency;