'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormComment = sequelize.define('form_comment', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: DataTypes.DATE
  });

  FormComment.associate = models => {
    FormComment.belongsTo(models.Form);
    FormComment.belongsTo(models.Employee);
  };

  return FormComment;
};
