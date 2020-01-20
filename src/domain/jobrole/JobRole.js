'use strict';

const { attributes } = require('structure');

const JobRole = attributes({
  id: Number,
  role: {
    type: String,
    required: true
  }
})(
  class JobRole {

  }
);

module.exports = JobRole;