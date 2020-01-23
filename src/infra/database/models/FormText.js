'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormText = sequelize.define('form_text', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: DataTypes.TEXT,
    group_item_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  });

  FormText.associate = models => {
    FormText.belongsTo(models.FormCompetencyGroup);
  };

  return FormText;
};
