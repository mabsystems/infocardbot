'use strict';
module.exports = (sequelize, DataTypes) => {
  const Numerations = sequelize.define('Numerations', {
    name: DataTypes.STRING,
    numeration: DataTypes.INTEGER,
    textID: DataTypes.STRING
  }, {});
  Numerations.associate = function(models) {
    // associations can be defined here
  };
  return Numerations;
};
