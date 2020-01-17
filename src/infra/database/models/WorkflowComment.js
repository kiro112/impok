'use strict';

module.exports = function(sequelize, DataTypes) {
  const WorkflowComment = sequelize.define('workflow_comment', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: DataTypes.DATE
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        WorkflowComment.belongsTo(models.Workflow);
        WorkflowComment.belongsTo(models.Employee);
      }
    }
  });

  return WorkflowComment;
};
