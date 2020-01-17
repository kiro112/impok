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
  }
};

module.exports = JobFamilyController;