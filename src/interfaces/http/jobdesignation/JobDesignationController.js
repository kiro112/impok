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
  }
};

module.exports = JobDesignationController;