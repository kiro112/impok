'use strict';

module.exports = function(sequelize, DataTypes) {
  const Workflow = sequelize.define('workflow', {
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
        Workflow.belongsTo(models.Employee);
        Workflow.belongsTo(models.Form);
        Workflow.belongsTo(models.Employee, {
          foreignKey: 'manager_id'
        });
      }
    }
  });

  return Workflow;
};
