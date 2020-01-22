'use strict';

const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');


const UserGroupController = {

  get router() {
    const router = Router();

    router.use(inject('UserGroupSerializer'));

    router.get('/', inject('GetUserGroups'), this.index);
    router.get('/:id', inject('GetUserGroup'), this.show);
    router.post('/', inject('CreateUserGroup'), this.add);

    return router;
  },

  index(req, res, next) {
    const {
      GetUserGroups,
      UserGroupSerializer
    } = req;

    const {
      SUCCESS,
      ERROR
    } = GetUserGroups.outputs;

    GetUserGroups
      .on(SUCCESS, user_groups => {
        res
          .status(Status.OK)
          .json(user_groups.map(UserGroupSerializer.serialize));
      })
      .on(ERROR, next);
    
    GetUserGroups.execute();
  },

  show(req, res, next) {
    const {
      GetUserGroup,
      UserGroupSerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = GetUserGroup.outputs;

    GetUserGroup
      .on(SUCCESS, user_group => {
        res
          .status(Status.OK)
          .json(UserGroupSerializer.serialize(user_group));
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

    GetUserGroup.execute(Number(req.params.id));
  },
  
  add(req, res, next) {
    const {
      CreateUserGroup,
      UserGroupSerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = CreateUserGroup.outputs;

    CreateUserGroup
      .on(SUCCESS, user_group => {
        res
          .status(Status.OK)
          .json(UserGroupSerializer.serialize(user_group));
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

    CreateUserGroup.execute(req.body);
  }

};

module.exports = UserGroupController;