'use strict';

module.exports = function(sequelize, DataTypes) {
  const Employee = sequelize.define('employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      }
    }
  });

  return Employee;
};
