'use strict';

const Operation = require('src/app/Operation');

class GetCompetencies extends Operation {

  constructor({ CompetencyRepository }) {
    super();
    this.CompetencyRepository = CompetencyRepository;
  }

  async execute() {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = this.outputs;

    try {
      const competencies = await this.CompetencyRepository.getAll({
        attributes: ['id', 'description', 'competency_group_id']
      });

      this.emit(SUCCESS, competencies);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      this.emit(ERROR, error);
    }
  }
  
}

GetCompetencies.setOutputs([
  'SUCCESS',
  'NOT_FOUND',
  'ERROR'
]);

module.exports = GetCompetencies;