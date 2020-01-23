'use strict';

module.exports = function(sequelize, DataTypes) {
  const Competency = sequelize.define('competency', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING
  });

  return Competency;
};
