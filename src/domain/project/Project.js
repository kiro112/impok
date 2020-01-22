'use strict';

const { attributes } = require('structure');

const Project = attributes({
  id: Number,
  project: {
    type: String,
    required: true
  }
})(
  class Project {}
);

module.exports = Project;