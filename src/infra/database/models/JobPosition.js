'use strict';

module.exports = function(sequelize, DataTypes) {
  const JobPosition = sequelize.define('job_position', {
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  JobPosition.associate = models => {
    JobPosition.belongsTo(models.JobFamily);
    JobPosition.belongsTo(models.JobDesignation);
    JobPosition.belongsTo(models.JobRole);
    JobPosition.belongsTo(models.JobLevel);
    JobPosition.belongsTo(models.JobCategory);
  };

  return JobPosition;
};
