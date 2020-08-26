'use strict';
module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    name: DataTypes.STRING,
    belongsNumeration: DataTypes.STRING
  }, {});
  Categories.associate = function(models) {
    models.Categories.hasMany(models.Orders,{
      foreignKey: 'category'
    })
  };
  return Categories;
};
