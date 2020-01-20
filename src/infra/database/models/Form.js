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
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'PENDING'
    },
    is_draft: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Form.belongsTo(models.FormTemplate);
        Form.belongsTo(models.Employee);
        Form.belongsTo(models.Employee, {
          foreignKey: 'manager_id'
        });
      }
    }
  });

  return Form;
};
