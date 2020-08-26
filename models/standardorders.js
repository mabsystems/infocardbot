'use strict';
module.exports = (sequelize, DataTypes) => {
  const StandardOrders = sequelize.define('StandardOrders', {
    pay: DataTypes.INTEGER,
    numeration: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER
  }, {});
  StandardOrders.associate = function(models) {
    models.StandardOrders.belongsTo(models.Users,{
      foreignKey: 'author_id'
    })
  };
  return StandardOrders;
};
