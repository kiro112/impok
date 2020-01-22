'use strict';

const { attributes } = require('structure');

const Competency = attributes({
  id: Number,
  name: {
    type: String,
    required: true
  },
  competency_group_id: {
    type: Number,
    required: true
  },
  description: String
})(
  class Competency {}
);

module.exports = Competency;