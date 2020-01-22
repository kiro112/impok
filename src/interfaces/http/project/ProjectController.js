'use strict';

const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const ProjectController = {

  get router() {
    const router = Router();

    router.use(inject('ProjectSerializer'));

    router.get('/', inject('GetProjects'), this.index);

    return router;
  },

  index(req, res, next) {
    const {
      GetProjects,
      ProjectSerializer
    } = req;

    const {
      SUCCESS,
      ERROR
    } = GetProjects.outputs;

    GetProjects
      .on(SUCCESS, projects => {
        res
          .status(Status.OK)
          .json(projects.map(ProjectSerializer.serialize));
      })
      .on(ERROR, next);

    GetProjects.execute();
  }

};

module.exports = ProjectController;