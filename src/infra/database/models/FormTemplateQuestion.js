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
    }
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      }
    }
  });

  return FormTemplateQuestion;
};
