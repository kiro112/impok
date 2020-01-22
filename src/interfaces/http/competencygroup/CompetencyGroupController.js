'use strict';

const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const CompetencyGroupController = {

  get router() {
    const router = Router();

    router.use(inject('CompetencyGroupSerializer'));
    
    router.get('/', inject('GetCompetencyGroups'), this.index);
    router.get('/:id', inject('GetCompetencyGroup'), this.show);

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
  
  show(req, res, next) {
    const {
      GetCompetencyGroup,
      CompetencyGroupSerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = GetCompetencyGroup.outputs;

    GetCompetencyGroup
      .on(SUCCESS, group => {
        res
          .status(Status.OK)
          .json(CompetencyGroupSerializer.serialize(group));
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

    GetCompetencyGroup.execute(Number(req.params.id));
  },

};

module.exports = CompetencyGroupController;