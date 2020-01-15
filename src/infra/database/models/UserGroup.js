'use strict';

module.exports = function(sequelize, DataTypes) {
  const UserGroup = sequelize.define('user_group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        UserGroup.hasMany(models.Employee);
      }
    }
  });

  return UserGroup;
};
