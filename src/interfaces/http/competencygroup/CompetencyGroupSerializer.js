'use strict';

module.exports = {
  serialize({
    id,
    name,
    description
  }) {
    return {
      id,
      name,
      description
    };
  }
};