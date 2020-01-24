'use strict';

const Operation = require('src/app/Operation');

class GetJobPositions extends Operation {

  constructor({ JobPositionRepository }) {
    super();
    this.JobPositionRepository = JobPositionRepository;
  }

  async execute() {
    const {
      SUCCESS,
      ERROR
    } = this.outputs;

    try {
      const job_positions = await this.JobPositionRepository.getAll({
        attributes: [
          'id',
          'job_title',
          'job_family_id',
          'job_designation_id',
          'job_role_id',
          'job_level_id',
          'job_category_id'
        ]
      });

      this.emit(SUCCESS, job_positions);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }

};

GetJobPositions.setOutputs([
  'SUCCESS',
  'ERROR'
]);

module.exports = GetJobPositions;