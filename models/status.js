'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    fullName: DataTypes.STRING,
    shortName: DataTypes.STRING,
    code: DataTypes.INTEGER
  }, {freezeTableName: true});
  Status.associate = function(models) {
    models.Status.hasMany(models.Orders,{
      foreignKey: 'status',
      sourceKey: 'code'
    })
  };
  return Status;
};
