'use strict';

const Operation = require('src/app/Operation');
const CompetencyGroup = require('src/domain/competencygroup/CompetencyGroup');

class CreateCompetencyGroup extends Operation {

  constructor({ CompetencyGroupRepository }) {
    this.CompetencyGroupRepository = CompetencyGroupRepository;
  }

  async execute(data) {
    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = this.outputs;

    const competency_group = new CompetencyGroup(data);
    try {
      const new_group = this.CompetencyGroupRepository.add(competency_group);
      this.emit(SUCCESS, new_group);
    } catch(error) {
      if (error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }
      this.emit(ERROR, error);
    }
  }
  
}

CreateCompetencyGroup.setOutputs([
  'SUCCESS', 'ERROR', 'VALIDATION_ERROR'
]);

module.exports = CreateCompetencyGroup;