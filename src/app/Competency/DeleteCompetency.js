'use strict';

const Operation = require('src/app/Operation');

class DeleteCompetency extends Operation {

  constructor({ CompetencyRepository }) {
    super();
    this.CompetencyRepository = CompetencyRepository;
  }

  async execute(id) {
    const {
      SUCCESS,
      NOT_FOUND
    } = this.outputs;

    try {
      await this.CompetencyRepository.remove(id);
      this.emit(SUCCESS);
    } catch(error) {
      this.emit(NOT_FOUND, error);
    }
  }

}

DeleteCompetency.setOutputs([
  'SUCCESS',
  'NOT_FOUND',
  'ERROR'
]);

module.exports = DeleteCompetency;