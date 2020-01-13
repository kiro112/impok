'use strict';

module.exports = function(sequelize, DataTypes) {
  const Form = sequelize.define('form', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here

        Form.belongsTo(models.FormType, {
          foreignKey: 'form_type_id'
        });
      }
    }
  });

  return Form;
};
