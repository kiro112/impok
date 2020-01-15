'use strict';

module.exports = function(sequelize, DataTypes) {
  const Evaluation = sequelize.define('evaluation', {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'PENDING'
    }
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      }
    }
  });

  return Evaluation;
};
