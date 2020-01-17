'use strict';

module.exports = function(sequelize, DataTypes) {
  const Activity = sequelize.define('activity', {
    milestone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: DataTypes.DATE
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Activity.belongsTo(models.Workflow);
        Activity.belongsTo(models.Employee);
      }
    }
  });

  return Activity;
};
