'use strict';
module.exports = (sequelize, DataTypes) => {
  const Colleges = sequelize.define('Colleges', {
    fullName: DataTypes.STRING,
    shortName: DataTypes.STRING
  }, {});
  Colleges.associate = function(models) {
    models.Colleges.hasMany(models.Orders,{
      foreignKey: 'college'
    })
  };
  return Colleges;
};
