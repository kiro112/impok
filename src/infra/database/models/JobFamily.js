'use strict';

module.exports = function(sequelize, DataTypes) {
  const JobFamily = sequelize.define('job_family', {
    family: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
        // JobFamily.hasMany(models.JobDesignation, {
        //   foreignKey: 'job_family_id'
        // });
      }
    }
  });

  return JobFamily;
};
