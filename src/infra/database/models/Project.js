'use strict';

module.exports = function(sequelize, DataTypes) {
  const Project = sequelize.define('project', {
    project: {
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

  return Project;
};
