'use strict';

const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const JobLevelController = {
  get router() {
    const router = Router();
    
    router.use(inject('JobLevelSerializer'));

    router.get('/', inject('GetLevels'), this.index);
    router.get('/:id', inject('GetLevel'), this.show);

    return router;
  },

  index(req, res, next) {
    const {
      GetLevels,
      JobLevelSerializer
    } = req;

    const {
      SUCCESS,
      ERROR
    } = GetLevels.outputs;

    GetLevels
      .on(SUCCESS, levels => {
        res
          .status(Status.OK)
          .json(levels.map(JobLevelSerializer.serialize));
      })
      .on(ERROR, next);
    
    GetLevels.execute();
  },

  show(req, res, next) {
    const {
      GetLevel,
      JobLevelSerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = GetLevel.outputs;

    GetLevel
      .on(SUCCESS, level => {
        res
          .status(Status.OK)
          .json(JobLevelSerializer.serialize(level));
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

    GetLevel.execute(Number(req.params.id));
  }
};

module.exports = JobLevelController;