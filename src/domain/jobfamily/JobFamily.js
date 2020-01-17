'use strict';

const { attributes } = require('structure');

const JobFamily = attributes({
  id: Number,
  family: {
    type: String,
    required: true
  }
})(class JobFamily {

});



module.exports = JobFamily;