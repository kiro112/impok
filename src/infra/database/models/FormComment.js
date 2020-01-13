'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormComment = sequelize.define('form_comment', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here

        FormComment.belongsTo(models.Form, {
          foreignKey: 'form_id'
        });
      }
    }
  });

  return FormComment;
};
