'use strict';

const { attributes } = require('structure');

const JobLevel = attributes({
  id: Number,
  level: {
    type: String,
    required: true
  }
})(
  class JobLevel {}
);

module.exports = JobLevel;