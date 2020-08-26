'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    hash: DataTypes.STRING,
    role: DataTypes.INTEGER,
    settings: DataTypes.TEXT
  }, {});
  Users.associate = function(models) {
    models.Users.belongsTo(models.Roles,{
      foreignKey: 'role'
    })

    models.Users.hasMany(models.Orders,{
      foreignKey: 'author_id'
    })

    models.Users.hasMany(models.Orders,{
      foreignKey: 'deliveryAuthor'
    })

    models.Users.hasMany(models.StandardOrders,{
      foreignKey: 'author_id'
    })
  };
  return Users;
};
