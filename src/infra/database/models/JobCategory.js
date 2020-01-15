'use strict';

module.exports = function(sequelize, DataTypes) {
  const JobCategory = sequelize.define('job_category', {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      }
    }
  });

  return JobCategory;
};
