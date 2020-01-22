'use strict';

const Operation = require('src/app/Operation');

class DeleteCompetencyGroup extends Operation {
  
  constructor({ CompetencyGroupRepository }) {
    super();
    this.CompetencyGroupRepository = CompetencyGroupRepository;
  }

  async execute(id) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = this.outputs;

    try {
      await this.CompetencyGroupRepository.remove(id);
      this.emit(SUCCESS);
    } catch(error) {
      if (error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      this.emit(ERROR, error);
    }
  }

}

DeleteCompetencyGroup.setOutputs([
  'SUCCESS',
  'ERROR',
  'NOT_FOUND'
]);

module.exports = DeleteCompetencyGroup;