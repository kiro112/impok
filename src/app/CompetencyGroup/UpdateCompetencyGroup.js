'use strict';

const Operation = require('src/app/Operation');

class UpdateCompetencyGroup extends Operation {

  constructor({ CompetencyGroupRepository }) {
    super();
    this.CompetencyGroupRepository = CompetencyGroupRepository;
  }

  async execute(id, data) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND,
      VALIDATION_ERROR
    } = this.outputs;

    try {
      const competency_group = await this.CompetencyGroupRepository.update(id, data);
      this.emit(SUCCESS, competency_group);
    } catch(error) {
      switch(error.message) {
        case 'NotFoundError':
          return this.emit(NOT_FOUND, error);
        case 'Validation_Error':
          return this.emit(VALIDATION_ERROR, error);
        default:
          this.emit(ERROR, error);
      }
    }
  }

}

UpdateCompetencyGroup.setOutputs([
  'SUCCESS', 
  'ERROR', 
  'NOT_FOUND', 
  'VALIDATION_ERROR'
]);

module.exports = UpdateCompetencyGroup;