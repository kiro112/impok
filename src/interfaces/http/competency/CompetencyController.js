'use strict';

const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const CompetencyController = {
  
  get router() {
    const router = Router();

    router.use(inject('CompetencySerializer'));

    router.get('/', inject('GetCompetencies'), this.index);
    router.get('/:id', inject('GetCompetency'), this.show);

    return router;
  },

  index(req, res, next) {
    const {
      GetCompetencies,
      CompetencySerializer
    } = req;

    const {
      SUCCESS,
      ERROR
    } = GetCompetencies.outputs;

    GetCompetencies
      .on(SUCCESS, competencies => {
        res
          .status(Status.OK)
          .json(competencies.map(CompetencySerializer.serialize));
      })
      .on(ERROR, next);

    GetCompetencies.execute();
  },

  show(req, res, next) {
    const {
      GetCompetency,
      CompetencySerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = GetCompetency.outputs;

    GetCompetency
      .on(SUCCESS, competency => {
        res
          .status(Status.OK)
          .json(CompetencySerializer.serialize(competency));
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

    GetCompetency.execute(Number(req.params.id));
  },

};

module.exports = CompetencyController;