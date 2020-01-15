'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormTemplateText = sequelize.define('form_template_text', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: DataTypes.TEXT
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      }
    }
  });

  return FormTemplateText;
};
