'use strict';

module.exports = function(sequelize, DataTypes) {
  const JobDesignation = sequelize.define('job_designation', {
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return JobDesignation;
};
