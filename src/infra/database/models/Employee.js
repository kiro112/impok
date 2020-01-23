'use strict';

module.exports = function(sequelize, DataTypes) {
  const Employee = sequelize.define('employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Employee.associate = models => {
    Employee.belongsTo(models.JobPosition);
    Employee.belongsTo(models.UserGroup);
  };

  return Employee;
};
