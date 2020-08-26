'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schools = sequelize.define('Schools', {
    fullName: DataTypes.STRING,
    shortName: DataTypes.STRING
  }, {});
  Schools.associate = function(models) {
    models.Schools.hasMany(models.Orders,{
      foreignKey: 'school'
    })
  };
  return Schools;
};
