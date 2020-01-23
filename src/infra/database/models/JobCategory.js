'use strict';

module.exports = function(sequelize, DataTypes) {
  const JobCategory = sequelize.define('job_category', {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  return JobCategory;
};
