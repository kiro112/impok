'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormTemplateCompetency = sequelize.define('form_template_competency', {
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    group_item_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  });

  FormTemplateCompetency.associate = models => {
    FormTemplateCompetency.belongsTo(models.FormTemplateCompetencyGroup);
    FormTemplateCompetency.belongsTo(models.Competency);
  };

  return FormTemplateCompetency;
};
