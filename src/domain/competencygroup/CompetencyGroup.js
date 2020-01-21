'use strict';

const { attributes } = require('structure');

const CompetencyGroup = attributes({
  id: Number,
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
})(
  class CompetencyGroup {}
);

module.exports = CompetencyGroup;