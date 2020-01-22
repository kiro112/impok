'use strict';

const Operation = require('src/app/Operation');

class GetCompetencyGroup extends Operation {

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
      const competency_group = await this.CompetencyGroupRepository.getById(id);
      this.emit(SUCCESS, competency_group);
    } catch(error) {
      if (error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      return this.emit(ERROR, error);
    }
  }
  
}

GetCompetencyGroup.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetCompetencyGroup;