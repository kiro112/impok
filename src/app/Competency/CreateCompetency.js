'use strict';

const Operation = require('src/app/Operation');
const Competency = require('src/domain/competency/Competency');

class CreateCompetency extends Operation {

  constructor({ CompetencyRepository }) {
    super();
    this.CompetencyRepository = CompetencyRepository;
  }

  async execute(data) {
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = this.outputs;

    const competency = new Competency(data);
    try {
      const newCompetency = await this.CompetencyRepository.create(competency);
      this.emit(SUCCESS, newCompetency);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }

}

CreateCompetency.setOutputs([
  'SUCCESS',
  'ERROR',
  'VALIDATION_ERROR'
]);

module.exports = CreateCompetency;