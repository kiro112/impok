'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormTemplateCompetency = sequelize.define('form_template_competency', {
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      }
    }
  });

  return FormTemplateCompetency;
};
