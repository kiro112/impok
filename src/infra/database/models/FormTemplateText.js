'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormTemplateText = sequelize.define('form_template_text', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: DataTypes.TEXT,
    group_item_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  });

  FormTemplateText.associate = models => {
    FormTemplateText.belongsTo(models.FormTemplateCompetencyGroup);
  };

  return FormTemplateText;
};
