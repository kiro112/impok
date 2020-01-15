'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormTemplateCompetencyGroupElement = sequelize.define('form_template_competency_group_element', {
    element_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        FormTemplateCompetencyGroupElement.belongsTo(models.FormTemplateCompetencyGroup);
        FormTemplateCompetencyGroupElement.belongsTo(models.FormTemplateCompetency);
        FormTemplateCompetencyGroupElement.belongsTo(models.FormTemplateQuestion);
        FormTemplateCompetencyGroupElement.belongsTo(models.FormTemplateText);
      }
    }
  });

  return FormTemplateCompetencyGroupElement;
};
