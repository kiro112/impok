'use strict';

module.exports = function(sequelize, DataTypes) {
  const Project = sequelize.define('project', {
    project: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Project.associate = models => {
    Project.hasMany(models.EmployeeProject);
  };

  return Project;
};
