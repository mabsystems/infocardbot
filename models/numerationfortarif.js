'use strict';
module.exports = (sequelize, DataTypes) => {
  const NumerationForTarif = sequelize.define('NumerationForTarif', {
    nums: DataTypes.TEXT,
    downloaded: DataTypes.INTEGER
  }, {});
  NumerationForTarif.associate = function(models) {
    // associations can be defined here
  };
  return NumerationForTarif;
};