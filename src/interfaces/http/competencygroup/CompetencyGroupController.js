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
    router.post('/', inject('CreateCompetencyGroup'), this.add);
    router.put('/:id', inject('UpdateCompetencyGroup'), this.update);
    router.delete('/:id', inject('DeleteCompetencyGroup'), this.remove);

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

  add(req, res, next) {
    const {
      CreateCompetencyGroup,
      CompetencyGroupSerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = CreateCompetencyGroup.outputs;

    CreateCompetencyGroup
      .on(SUCCESS, group => {
        res
          .status(Status.OK)
          .json(CompetencyGroupSerializer.serialize(group));
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

    CreateCompetencyGroup.execute(req.body);
  },

  update(req, res, next) {
    const {
      UpdateCompetencyGroup,
      CompetencyGroupSerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR,
      NOT_FOUND
    } = UpdateCompetencyGroup.outputs;

    UpdateCompetencyGroup
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
      .on(VALIDATION_ERROR, error => {
        res
          .status(Status.BAD_REQUEST)
          .json({
            type: error.message,
            details: error.details
          });
      })
      .on(ERROR, next);

    UpdateCompetencyGroup.execute(Number(req.params.id), req.body);

  },

  remove(req, res, next) {
    const {
      DeleteCompetencyGroup,
    } = req;

    const {
      SUCCESS,
      NOT_FOUND,
      ERROR
    } = DeleteCompetencyGroup.outputs;

    DeleteCompetencyGroup
      .on(SUCCESS, () => {
        res
          .status(Status.OK)
          .end();
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
    
      DeleteCompetencyGroup.execute(Number(req.params.id));
  }
};

module.exports = CompetencyGroupController;