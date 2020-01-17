'use strict';

const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const JobFamilyController = {
  get router() {
    const router = Router();

    router.use(inject('jobFamilySerializer'));

    router.get('/', inject('getAllJobFamilies'), this.index);

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
  }  
};

module.exports = JobFamilyController;