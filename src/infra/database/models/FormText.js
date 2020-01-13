'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormText = sequelize.define('form_text', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here

        FormText.belongsTo(models.Form, {
          foreignKey: 'form_id'
        });
      }
    }
  });

  return FormText;
};
