'use strict';

const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const ProjectController = {

  get router() {
    const router = Router();

    router.use(inject('ProjectSerializer'));

    router.get('/', inject('GetProjects'), this.index);
    router.get('/:id', inject('GetProject'), this.show);

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
  },

  show(req, res, next) {
    const {
      GetProject,
      ProjectSerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = GetProject.outputs;

    GetProject
      .on(SUCCESS, project => {
        res
          .status(Status.OK)
          .json(ProjectSerializer.serialize(project));
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

    GetProject.execute(Number(req.params.id));
  }

};

module.exports = ProjectController;