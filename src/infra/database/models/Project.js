'use strict';

module.exports = function(sequelize, DataTypes) {
  const Project = sequelize.define('project', {
    project: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Project.hasMany(models.EmployeeProject);
      }
    }
  });

  return Project;
};
