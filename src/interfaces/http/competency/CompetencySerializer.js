'use strict';

module.exports = {
  serialize({
    id,
    name,
    description,
    competency_group_id
  }) {
    return {
      id,
      name,
      description,
      competency_group_id
    };
  }
};