'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormTemplate = sequelize.define('form_template', {
    rating_scale: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  FormTemplate.associate = models => {
    FormTemplate.belongsTo(models.FormType);
    FormTemplate.belongsTo(models.JobPosition);
  };

  return FormTemplate;
};
