'use strict';

const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const JobFamilyController = {
  get router() {
    const router = Router();

    router.use(inject('jobFamilySerializer'));

    router.get('/', inject('getAllJobFamilies'), this.index);
    router.get('/:id', inject('getJobFamily'), this.show);
    router.post('/', inject('createJobFamily'), this.create);
    router.put('/:id', inject('updateJobFamily'), this.update);
    router.delete('/:id', inject('deleteJobFamily'), this.remove);

    return router;
  },

  index(req, res, next) {
    const { getAllJobFamilies, jobFamilySerializer } = req;

    const { SUCCESS, ERROR } = getAllJobFamilies.outputs;

    getAllJobFamilies
      .on(SUCCESS, (families) => {
        res
          .status(Status.OK)
          .json(families.map(jobFamilySerializer.serialize));
      })
      .on(ERROR, next);

    getAllJobFamilies.execute();
  },

  show(req, res, next) {

    const { getJobFamily, jobFamilySerializer } = req;
    const { SUCCESS, ERROR, NOT_FOUND } = getJobFamily.outputs;

    getJobFamily
      .on(SUCCESS, family => {
        res
          .status(200)
          .json(jobFamilySerializer.serialize(family));
      })
      .on(NOT_FOUND, error => {
        res
          .status(Status.NOT_FOUND)
          .json({
            type: 'NotFoundError',
            details: error.details
          })
          .on(ERROR, next);
      });

    getJobFamily.execute(Number(req.params.id));
  },

  create(req, res, next) {
    const {
      createJobFamily,
      jobFamilySerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = createJobFamily.outputs;

    createJobFamily
      .on(SUCCESS, family => {
        res
          .status(Status.CREATED)
          .json(jobFamilySerializer.serialize(family));
      })
      .on(VALIDATION_ERROR, error => {
        res
          .status(Status.BAD_REQUEST)
          .json({
            type: 'ValidationError',
            details: error.details
          });
      })
      .on(ERROR, next);

    createJobFamily.execute(req.body);
  },

  update(req, res, next) {
    const {
      updateJobFamily,
      jobFamilySerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR,
      NOT_FOUND
    } = updateJobFamily.outputs;

    updateJobFamily
      .on(SUCCESS, fam => {
        res
          .status(Status.OK)
          .json(jobFamilySerializer.serialize(fam));
      })
      .on(VALIDATION_ERROR, error => {
        res
          .status(Status.BAD_REQUEST)
          .json({
            type: 'ValidationError',
            details: error.details
          });
      })
      .on(NOT_FOUND, error => {
        res
          .status(Status.NOT_FOUND)
          .json({
            type: 'NotFoundError',
            details: error.details
          });
      })
      .on(ERROR, next);
    
    updateJobFamily.execute(Number(req.params.id), req.body);
  },

  remove(req, res, next) {
    const { deleteJobFamily } = req;
    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = deleteJobFamily.outputs;

    deleteJobFamily
      .on(SUCCESS, () => {
        res
          .status(Status.OK)
          .end();
      })
      .on(NOT_FOUND, error => {
        res
          .status(Status.NOT_FOUND)
          .json({
            type: 'NotFoundError',
            details: error.details
          });
      })
      .on(ERROR, next);

    deleteJobFamily.execute(Number(req.params.id));
  }
};

module.exports = JobFamilyController;