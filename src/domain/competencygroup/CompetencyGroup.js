'use strict';

const { attributes } = require('structure');

const CompetencyGroup = attributes({
  id: Number,
  name: {
    type: String,
    required: true
  },
  description: String
})(
  class CompetencyGroup {}
);

module.exports = CompetencyGroup;