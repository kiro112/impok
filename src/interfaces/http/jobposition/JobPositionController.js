'use strict';

const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

module.exports = {

  get router() {
    const router = Router();

    router.use(inject('JobPositionSerializer'));

    router.get('/', inject('GetJobPositions'), this.index);
    router.get('/:id', inject('GetJobPosition'), this.show);
    router.post('/', inject('CreateJobPosition'), this.create);


    return router;
  },

  index(req, res, next) {
    const {
      GetJobPositions,
      JobPositionSerializer
    } = req;

    const {
      SUCCESS,
      ERROR
    } = GetJobPositions.outputs;

    GetJobPositions
      .on(SUCCESS, job_positions => {
        res
          .status(Status.OK)
          .json(job_positions.map(JobPositionSerializer.serialize));
      })
      .on(ERROR, next);

    GetJobPositions.execute();
  },

  show(req, res, next) {
    const {
      GetJobPosition,
      JobPositionSerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = GetJobPosition.outputs;

    GetJobPosition
      .on(SUCCESS, job_position => {
        res
          .status(Status.OK)
          .json(JobPositionSerializer.serialize(job_position));
      })
      .on(NOT_FOUND, error => {
        res
          .status(Status.NOT_FOUND)
          .json({
            type: error.message,
            details: error.details
          });
      })
      .on(ERROR, next);

    GetJobPosition.execute(Number(req.params.id));
  },

  create(req, res, next) {
    const {
      CreateJobPosition,
      JobPositionSerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = CreateJobPosition.outputs;

    CreateJobPosition
      .on(SUCCESS, job_position => {
        res
          .status(Status.OK)
          .json(JobPositionSerializer.serialize(job_position));
      })
      .on(VALIDATION_ERROR, error => {
        res
          .status(Status.BAD_REQUEST)
          .json({
            type: error.message,
            details: error.details
          });
      })
      .on(ERROR, next);

    CreateJobPosition.execute(req.body);
  }

};