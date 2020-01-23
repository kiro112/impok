'use strict';

module.exports = function(sequelize) {
  const EmployeeProject = sequelize.define('employee_project', {});

  EmployeeProject.associate = models => {
    EmployeeProject.belongsTo(models.Employee);
  }

  return EmployeeProject;
};