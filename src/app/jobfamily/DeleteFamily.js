'use strict';

const Operation = require('src/app/Operation');

class DeleteFamily extends Operation {
  constructor({ jobFamilyRepository }) {
    super();
    this.jobFamilyRepository = jobFamilyRepository;
  }

  async execute(id) {
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = this.outputs;

    try {
      await this.jobFamilyRepository.remove(Number(id));
      this.emit(SUCCESS);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }
      this.emit(ERROR, error);
    }
  }

}

DeleteFamily.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = DeleteFamily;