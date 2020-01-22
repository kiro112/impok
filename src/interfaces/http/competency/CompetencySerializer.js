'use strict';

module.exports = {
  serializer({
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