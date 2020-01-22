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
    } = this.outputs;

    try {
      const competencies = await this.CompetencyRepository.getAll({
        attributes: ['id', 'name', 'description', 'competency_group_id']
      });

      this.emit(SUCCESS, competencies);

    } catch(error) {
      this.emit(ERROR, error);
    }
  }
  
}

GetCompetencies.setOutputs([
  'SUCCESS',
  'ERROR'
]);

module.exports = GetCompetencies;