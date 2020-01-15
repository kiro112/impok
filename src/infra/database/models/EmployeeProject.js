'use strict';

module.exports = function(sequelize, DataTypes) {
  const EmployeeProject = sequelize.define('employee_project', {}, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        EmployeeProject.belongsTo(models.Employee);

        // Employee.belongsTo(models.JobPosition, {
        //   foreignKey: 'job_position_id'
        // });

        // Employee.belongsTo(models.UserGroup, {
        //   foreignKey: 'user_group_id'
        // });

        // Employee.belongsTo(models.Project, {
        //   foreignKey: 'project_id'
        // });
      }
    }
  });

  return EmployeeProject;
};
