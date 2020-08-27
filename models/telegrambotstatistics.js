'use strict';
module.exports = (sequelize, DataTypes) => {
  const TelegramBotStatistics = sequelize.define('TelegramBotStatistics', {
    name: DataTypes.STRING,
    telegramID: DataTypes.STRING,
    method: DataTypes.STRING,
    iin: DataTypes.STRING
  }, {});
  TelegramBotStatistics.associate = function(models) {
    // associations can be defined here
  };
  return TelegramBotStatistics;
};
