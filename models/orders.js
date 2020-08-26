'use strict';

module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    iin: DataTypes.STRING,
    category: DataTypes.INTEGER,
    photo: DataTypes.TEXT,
    phone: DataTypes.STRING,
    pay: DataTypes.INTEGER,
    schoolboyClass: DataTypes.INTEGER,
    studentCurrentCourse: DataTypes.INTEGER,
    studentCountCourses: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER,
    doc1: DataTypes.STRING,
    doc2: DataTypes.STRING,
    doc3: DataTypes.STRING,
    doc4: DataTypes.STRING,
    doc5: DataTypes.STRING,
    is_active: DataTypes.INTEGER,
    numeration: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    school: DataTypes.INTEGER,
    college: DataTypes.INTEGER,
    expiryDate: DataTypes.DATE,
    downloaded: DataTypes.INTEGER,
    layoutMainCardFlag: DataTypes.INTEGER,
    idsOnPage: DataTypes.STRING,
    deliveryAuthor: DataTypes.STRING
  }, {});
  Orders.associate = function(models) {

    models.Orders.belongsTo(models.Categories,{
      foreignKey: 'category'
    })

    models.Orders.belongsTo(models.Colleges,{
      foreignKey: 'college'
    })

    models.Orders.belongsTo(models.Schools,{
      foreignKey: 'school'
    })

    models.Orders.belongsTo(models.Users,{
      foreignKey: 'author_id'
    })

    models.Orders.belongsTo(models.Status,{
      foreignKey: 'status',
      targetKey: 'code'
    })

    models.Orders.belongsTo(models.Users,{
      as: 'delivery_Author',
      foreignKey: 'deliveryAuthor'
    })
  };
  return Orders;
};
