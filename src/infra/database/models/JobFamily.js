'use strict';

module.exports = function(sequelize, DataTypes) {
  const JobFamily = sequelize.define('job_family', {
    family: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  JobFamily.associate = models => {
    JobFamily.hasMany(models.JobDesignation);
  };

  return JobFamily;
};
