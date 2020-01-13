'use strict';

module.exports = function(sequelize, DataTypes) {
  const JobRole = sequelize.define('job_role', {
    role: {
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

  return JobRole;
};
