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
    router.post('/', inject('CreateProject'), this.add);
    router.put('/:id', inject('UpdateProject'), this.update);
    router.delete('/:id', inject('DeleteProject'), this.remove);

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
  },

  add(req, res, next) {
    const {
      CreateProject,
      ProjectSerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = CreateProject.outputs;

    CreateProject
      .on(SUCCESS, project => {
        res
          .status(Status.OK)
          .json(ProjectSerializer.serialize(project));
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

    CreateProject.execute(req.body);
  },

  update(req, res, next) {
    const {
      UpdateProject,
      ProjectSerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      NOT_FOUND,
      VALIDATION_ERROR
    } = UpdateProject.outputs;

    UpdateProject
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
      .on(VALIDATION_ERROR, error => {
        res
          .status(Status.BAD_REQUEST)
          .json({
            type: error.message,
            details: error.details
          });
      })
      .on(ERROR, next);

    UpdateProject.execute(Number(req.params.id), req.body);
  },

  remove(req, res, next) {
    const {
      DeleteProject
    } = req;

    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = DeleteProject.outputs;

    DeleteProject
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

    DeleteProject.execute(Number(req.params.id));
  }

};

module.exports = ProjectController;