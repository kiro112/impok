'use strict';

const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');


const UserGroupController = {

  get router() {
    const router = Router();

    router.use(inject('UserGroupSerializer'));

    router.get('/', inject('GetUserGroups'), this.index);

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
  

};

module.exports = UserGroupController;