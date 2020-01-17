'use strict';

module.exports = function(sequelize, DataTypes) {
  const Form = sequelize.define('form', {
    project: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tenure: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Form.belongsTo(models.FormTemplate);
      }
    }
  });

  return Form;
};
