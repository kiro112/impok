'use strict';

const { attributes } = require('structure');

const JobDesignation = attributes({
  id: Number,
  designation: {
    type: String,
    required: true
  },
  job_family_id: {
    type: Number,
    required: true
  }
})(
  class JobDesignation {

  }
);

module.exports = JobDesignation;