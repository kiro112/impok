'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormCompetencyGroup = sequelize.define('form_competency_group', {
    order: DataTypes.INTEGER
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here

        FormCompetencyGroup.belongsTo(models.Form, {
          foreignKey: 'form_id'
        });
      }
    }
  });

  return FormCompetencyGroup;
};
