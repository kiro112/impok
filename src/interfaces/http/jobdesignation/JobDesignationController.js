'use strict';

const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const JobDesignationController = {
  get router() {
    const router = Router();

    router.use(inject('JobDesignationSerializer'));

    router.get('/', inject('GetAllJobDesignations'), this.index);
    router.get('/:id', inject('GetDesignation'), this.show);
    router.put('/:id', inject('UpdateDesignation'), this.update);
    router.post('/', inject('CreateDesignation'), this.create);
    router.delete('/:id', inject('DeleteDesignation'), this.remove);

    return router;
  },

  index(req, res, next) {
    const {
      GetAllJobDesignations,
      JobDesignationSerializer
    } = req;

    const { SUCCESS, ERROR } = GetAllJobDesignations.outputs;

    GetAllJobDesignations
      .on(SUCCESS, designations => {
        res
          .status(Status.OK)
          .json(designations.map(JobDesignationSerializer.serialize));
      })
      .on(ERROR, next);

    GetAllJobDesignations.execute();
  },

  show(req, res, next) {
    const {
      GetDesignation,
      JobDesignationSerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = GetDesignation.outputs;

    GetDesignation
      .on(SUCCESS, designation => {
        res
          .status(Status.OK)
          .json(JobDesignationSerializer.serialize(designation));
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

    GetDesignation.execute(Number(req.params.id));
  },

  update(req, res, next) {
    const {
      UpdateDesignation,
      JobDesignationSerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      NOT_FOUND,
      VALIDATION_ERROR
    } = UpdateDesignation.outputs;
  

    UpdateDesignation
      .on(SUCCESS, designation => {
        res
          .status(Status.OK)
          .json(JobDesignationSerializer.serialize(designation));
      })
      .on(VALIDATION_ERROR, error => {
        res
          .status(Status.BAD_REQUEST)
          .json({
            type: error.message,
            details: error.details
          });
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

    UpdateDesignation.execute(Number(req.params.id), req.body);
  },

  create(req, res, next) {
    const {
      JobDesignationSerializer,
      CreateDesignation,
    } = req;

    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = CreateDesignation.outputs;

    CreateDesignation
      .on(SUCCESS, designation => {
        res
          .status(Status.OK)
          .json(JobDesignationSerializer.serialize(designation));
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

    CreateDesignation.execute(req.body);
  },

  remove(req, res, next) {
    const { DeleteDesignation } = req;

    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = DeleteDesignation.outputs;

    DeleteDesignation
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

    DeleteDesignation.execute(Number(req.params.id));
  }
};

module.exports = JobDesignationController;