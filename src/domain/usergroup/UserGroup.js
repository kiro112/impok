'use strict';

const { attributes } = require('structure');

module.exports = attributes({
  id: Number,
  name: {
    type: String,
    required: true
  }
})(
  class UserGroup {}
);