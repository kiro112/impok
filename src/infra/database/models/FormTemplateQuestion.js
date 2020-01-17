'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormTemplateQuestion = sequelize.define('form_template_question', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    group_item_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        FormTemplateQuestion.belongsTo(models.FormTemplateCompetencyGroup);
      }
    }
  });

  return FormTemplateQuestion;
};
