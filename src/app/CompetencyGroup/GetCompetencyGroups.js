'use strict';

const Operation = require('src/app/Operation');

class GetCompetencyGroups extends Operation {

  constructor({ CompetencyGroupRepository }) {
    super();
    this.CompetencyGroupRepository = CompetencyGroupRepository;
  }

  async execute() {
    const {
      SUCCESS,
      ERROR
    } = this.outputs;
    
    try {
      const competency_groups = await this.CompetencyGroupRepository.getAll({
        attributes: ['id', 'name', 'description']
      });

      this.emit(SUCCESS, competency_groups);
    } catch(error) {
      this.emit(ERROR, error);
    }
  } 

}

GetCompetencyGroups.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetCompetencyGroups;