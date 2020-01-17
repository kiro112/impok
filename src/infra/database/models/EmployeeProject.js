'use strict';

module.exports = function(sequelize) {
  const EmployeeProject = sequelize.define('employee_project', {}, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        EmployeeProject.belongsTo(models.Employee);
      }
    }
  });

  return EmployeeProject;
};
