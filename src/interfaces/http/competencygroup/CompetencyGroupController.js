'use strict';

const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const CompetencyGroupController = {

  get router() {
    const router = Router();

    router.use(inject('CompetencyGroupSerializer'));
    
    router.get('/', inject('GetCompetencyGroups'), this.index);

    return router;
  },

  index(req, res, next) {
    const {
      GetCompetencyGroups,
      CompetencyGroupSerializer
    } = req;

    const {
      SUCCESS,
      ERROR
    } = GetCompetencyGroups.outputs;

    GetCompetencyGroups
      .on(SUCCESS, groups => {
        res
          .status(Status.OK)
          .json(groups.map(CompetencyGroupSerializer.serialize));
      })
      .on(ERROR, next);
    
    GetCompetencyGroups.execute();
  },
  
};

module.exports = CompetencyGroupController;