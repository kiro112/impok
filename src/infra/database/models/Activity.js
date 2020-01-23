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
  });

  Activity.associate = models => {
    Activity.belongsTo(models.Form);
    Activity.belongsTo(models.Employee);
  }

  return Activity;
};
