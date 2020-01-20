'use strict';

const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const JobRoleController = {
  get router() {
    const router = Router();

    router.use(inject('JobRoleSerializer'));

    router.get('/', inject('GetRoles'), this.index);
    router.get('/:id', inject('GetRole'), this.show);
    router.post('/', inject('CreateRole'), this.add);
    router.put('/:id', inject('UpdateRole'), this.update);
    router.delete('/:id', inject('DeleteRole'), this.remove);

    return router;
  },

  index(req, res, next) {
    const {
      GetRoles,
      JobRoleSerializer
    } = req;

    const {
      SUCCESS,
      ERROR
    } = GetRoles.outputs;

    GetRoles
      .on(SUCCESS, roles => {
        res
          .status(Status.OK)
          .json(roles.map(JobRoleSerializer.serialize));
      })
      .on(ERROR, next);

    GetRoles.execute();
  },

  show(req, res, next) {
    const {
      GetRole,
      JobRoleSerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = GetRole.outputs;

    GetRole
      .on(SUCCESS, role => {
        res
          .status(Status.OK)
          .json(JobRoleSerializer.serialize(role));
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
    
    GetRole.execute(Number(req.params.id));
  },

  add(req, res, next) {
    const {
      CreateRole,
      JobRoleSerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = CreateRole.outputs;

    CreateRole
      .on(SUCCESS, role => {
        res
          .status(Status.OK)
          .json(JobRoleSerializer.serialize(role));
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
    
      CreateRole.execute(req.body);
  },

  update(req, res, next) {
    const {
      UpdateRole,
      JobRoleSerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      NOT_FOUND,
      VALIDATION_ERROR
    } = UpdateRole.outputs;

    UpdateRole
      .on(SUCCESS, role => {
        res
          .status(Status.OK)
          .json(JobRoleSerializer.serialize(role));
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

    UpdateRole.execute(Number(req.params.id), req.body);
  },

  remove(req, res, next) {
    const {
      DeleteRole
    } = req;

    const {
      SUCCESS,
      NOT_FOUND,
      ERROR
    } = DeleteRole.outputs;

    DeleteRole
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

    DeleteRole.execute(Number(req.params.id));
  }
};

module.exports = JobRoleController;