'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormQuestion = sequelize.define('form_question', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    group_item_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  });

  FormQuestion.associate = models => {
    FormQuestion.belongsTo(models.FormCompetencyGroup);
  };

  return FormQuestion;
};
