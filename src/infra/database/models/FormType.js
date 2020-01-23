'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormType = sequelize.define('form_type', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: DataTypes.STRING
  });

  return FormType;
};
