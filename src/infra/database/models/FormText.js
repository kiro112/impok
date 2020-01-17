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
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        FormText.belongsTo(models.FormCompetencyGroup);
      }
    }
  });

  return FormText;
};
