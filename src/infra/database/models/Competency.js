'use strict';

module.exports = function(sequelize, DataTypes) {
  const Competency = sequelize.define('competency', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING,
    weight: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    }
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      }
    }
  });

  return Competency;
};
