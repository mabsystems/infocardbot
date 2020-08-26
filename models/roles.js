'use strict';
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    name: DataTypes.STRING,
    access: DataTypes.TEXT,
    home_page: DataTypes.STRING
  }, {});
  Roles.associate = function(models) {
    models.Roles.hasMany(models.Roles,{
      foreignKey: 'role'
    })
  };
  return Roles;
};
