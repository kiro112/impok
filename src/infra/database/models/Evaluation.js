'use strict';

module.exports = function(sequelize, DataTypes) {
  const Evaluation = sequelize.define('evaluation', {
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Pending'
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here

        Evaluation.belongsTo(models.Form, {
          foreignKey: 'form_id'
        });

        Evaluation.belongsTo(models.Employee, {
          foreignKey: 'employee_id'
        });

        Evaluation.belongsTo(models.Employee, {
          foreignKey: 'manager_id'
        });

      }
    }
  });

  return Evaluation;
};
