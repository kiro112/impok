'use strict';

module.exports = function(sequelize, DataTypes) {
  const UserGroup = sequelize.define('user_group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      }
    }
  });

  return UserGroup;
};
