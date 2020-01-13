'use strict';

module.exports = function(sequelize, DataTypes) {
  const Question = sequelize.define('question', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here

        Question.belongsTo(models.Form, {
          foreignKey: 'form_id'
        });
      }
    }
  });

  return Question;
};
