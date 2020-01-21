'use strict';

const { attributes } = require('structure');

const JobCategory = attributes({
  id: Number,
  category: {
    type: String,
    required: true
  }
})(
  class JobCategory {}
);

module.exports = JobCategory;