'use strict';

const { attributes } = require('structure');

const JobPosition = attributes({
  id: Number,
  job_title: {
    type: String,
    required: true
  },
  job_family_id: {
    type: String,
    required: true
  },
  job_designation_id: {
    type: String,
    required: true
  },
  job_role_id: {
    type: String,
    required: true
  },
  job_level_id: {
    type: String,
    required: true
  },
  job_category_id: {
    type: String,
    required: true
  },
})(
  class JobPosition {}
);

module.exports = JobPosition;