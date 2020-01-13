'use strict';

module.exports = function(sequelize, DataTypes) {
  const Competency = sequelize.define('competency', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Competency.belongsTo(models.CompetencyGroup, {
          foreignKey: 'competency_group_id'
        });

      }
    }
  });

  return Competency;
};
