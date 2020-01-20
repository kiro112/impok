'use strict';

const Operation = require('src/app/Operation');

class DeleteDesignation extends Operation {
  constructor({ JobDesignationRepository }) {
    super();
    this.JobDesignationRepository = JobDesignationRepository;
  }

  async execute(id) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = this.outputs;

    try {
      await this.JobDesignationRepository.remove(Number(id));
      this.emit(SUCCESS);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      this.emit(ERROR, error);
    }
  }
}

DeleteDesignation.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = DeleteDesignation;