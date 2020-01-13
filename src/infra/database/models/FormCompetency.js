'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormCompetency = sequelize.define('form_competency', {
    score: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here

        FormCompetency.belongsTo(models.Form, {
          foreignKey: 'form_id'
        });

        FormCompetency.belongsTo(models.FormCompetencyGroup, {
          foreignKey: 'form_competency_group_id'
        });

        FormCompetency.belongsTo(models.Competency, {
          foreignKey: 'competency_id'
        });

      }
    }
  });

  return FormCompetency;
};
