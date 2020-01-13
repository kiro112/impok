'use strict';

module.exports = function(sequelize, DataTypes) {
  const CompetencyGroup = sequelize.define('competency_group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
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

  return CompetencyGroup;
};
