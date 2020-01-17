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
        Employee.belongsTo(models.JobPosition);
        Employee.belongsTo(models.UserGroup);
      }
    }
  });

  return Employee;
};
