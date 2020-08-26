'use strict';
module.exports = (sequelize, DataTypes) => {
  const Settings = sequelize.define('Settings', {
    name: DataTypes.STRING,
    value: DataTypes.STRING
  }, {});
  Settings.associate = function(models) {
    // associations can be defined here
  };
  return Settings;
};