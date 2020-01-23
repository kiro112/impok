'use strict';

module.exports = function(sequelize, DataTypes) {
  const CompetencyGroup = sequelize.define('competency_group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING
  });

  CompetencyGroup.associate = models => {
    CompetencyGroup.hasMany(models.Competency);
  };

  return CompetencyGroup;
};
