'use strict';

module.exports = function(sequelize, DataTypes) {
  const JobDesignation = sequelize.define('job_designation', {
    designation: {
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

  return JobDesignation;
};
