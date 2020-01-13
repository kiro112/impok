'use strict';

module.exports = function(sequelize, DataTypes) {
  const Employee = sequelize.define('employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here

        Employee.belongsTo(models.JobPosition, {
          foreignKey: 'job_position_id'
        });

        Employee.belongsTo(models.UserGroup, {
          foreignKey: 'user_group_id'
        });

        Employee.belongsTo(models.Project, {
          foreignKey: 'project_id'
        });

      }
    }
  });

  return Employee;
};
