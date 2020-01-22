'use strict';

const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const CompetencyController = {
  
  get router() {
    const router = Router();

    router.use(inject('CompetencySerializer'));

    router.get('/', inject('GetCompetencies'), this.index);

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
  }

};

module.exports = CompetencyController;