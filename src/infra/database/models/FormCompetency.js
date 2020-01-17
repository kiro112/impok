'use strict';

module.exports = function(sequelize, DataTypes) {
  const FormCompetency = sequelize.define('form_competency', {
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    target: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    achievement: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    group_item_order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        FormCompetency.belongsTo(models.FormCompetencyGroup);
        FormCompetency.belongsTo(models.Competency);
      }
    }
  });

  return FormCompetency;
};
