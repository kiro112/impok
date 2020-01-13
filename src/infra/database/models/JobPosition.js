'use strict';

module.exports = function(sequelize, DataTypes) {
  const JobPosition = sequelize.define('job_position', {
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here

        JobPosition.belongsTo(models.JobFamily, {
          foreignKey: 'job_family_id'
        });

        JobPosition.belongsTo(models.JobDesignation, {
          foreignKey: 'job_designation_id'
        });

        JobPosition.belongsTo(models.JobRole, {
          foreignKey: 'job_role_id'
        });

        JobPosition.belongsTo(models.JobLevel, {
          foreignKey: 'job_level_id'
        });

      }
    }
  });

  return JobPosition;
};
