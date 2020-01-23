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
  });

  FormTemplateCompetencyGroup.associate = models => {
    FormTemplateCompetencyGroup.belongsTo(models.FormTemplate);
    FormTemplateCompetencyGroup.belongsTo(models.CompetencyGroup);
  };

  return FormTemplateCompetencyGroup;
};
