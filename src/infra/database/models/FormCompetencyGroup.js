'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormCompetencyGroup = sequelize.define('form_competency_group', {
    weight: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    group_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        FormCompetencyGroup.belongsTo(models.Form);
        FormCompetencyGroup.belongsTo(models.CompetencyGroup);
      }
    }
  });

  return FormCompetencyGroup;
};
