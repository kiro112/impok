'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormTemplateCompetencyGroup = sequelize.define('form_template_competency_group', {
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
        FormTemplateCompetencyGroup.belongsTo(models.FormTemplate);
        FormTemplateCompetencyGroup.belongsTo(models.CompetencyGroup);
      }
    }
  });

  return FormTemplateCompetencyGroup;
};
