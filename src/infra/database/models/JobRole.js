'use strict';

module.exports = function(sequelize, DataTypes) {
  const JobRole = sequelize.define('job_role', {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return JobRole;
};
