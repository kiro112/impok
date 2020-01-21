'use strict';

const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const JobCategoryController = {
  get router() {
    const router = Router();

    router.use(inject('JobCategorySerializer'));

    router.get('/', inject('GetCategories'), this.index);
    router.get('/:id', inject('GetCategory'), this.show);
    router.post('/', inject('CreateCategory'), this.add);
    router.put('/:id', inject('UpdateCategory'), this.update);
    router.delete('/:id', inject('DeleteCategory'), this.remove);

    return router;
  },

  index(req, res, next) {
    const {
      GetCategories,
      JobCategorySerializer
    } = req;
    
    const {
      SUCCESS,
      ERROR
    } = GetCategories.outputs;

    GetCategories
      .on(SUCCESS, categories => {
        res
          .status(Status.OK)
          .json(categories.map(JobCategorySerializer.serialize));
      })
      .on(ERROR, next);
    
    GetCategories.execute();
  },

  show(req, res, next) {
    const {
      GetCategory,
      JobCategorySerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      NOT_FOUND
    } = GetCategory.outputs;

    GetCategory
      .on(SUCCESS, category => {
        res
          .status(Status.OK)
          .json(JobCategorySerializer.serialize(category));
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
    
    GetCategory.execute(Number(req.params.id));
  },

  add(req, res, next) {
    const {
      CreateCategory,
      JobCategorySerializer
    } = req;

    const {
      SUCCESS,
      ERROR,
      VALIDATION_ERROR
    } = CreateCategory.outputs;

    CreateCategory
      .on(SUCCESS, category => {
        res
          .status(Status.OK)
          .json(JobCategorySerializer.serialize(category));
      })
      .on(VALIDATION_ERROR, error => {
        res
          .status(Status.BAD_REQUEST)
          .json({
            type: error.message,
            details: error
          });
      })
      .on(ERROR, next);
    
    CreateCategory.execute(req.body);
  },

  update(req, res, next) {
    const {
      JobCategorySerializer,
      UpdateCategory
    } = req;

    const {
      SUCCESS,
      ERROR,
      NOT_FOUND,
      VALIDATION_ERROR
    } = UpdateCategory.outputs;

    UpdateCategory
      .on(SUCCESS, category => {
        res
          .status(Status.OK)
          .json(JobCategorySerializer.serialize(category));
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
            type: error.type,
            details: error.details
          });
      })
      .on(ERROR, next);

    UpdateCategory.execute(Number(req.params.id), req.body);
  },

  remove(req, res, next) {
    const {
      DeleteCategory,
    } = req;

    const {
      SUCCESS,
      NOT_FOUND,
      ERROR
    } = DeleteCategory.outputs;

    DeleteCategory
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

    DeleteCategory.execute(Number(req.params.id));
  }
};

module.exports = JobCategoryController;