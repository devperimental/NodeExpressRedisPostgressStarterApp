'use strict';
module.exports = (sequelize, DataTypes) => {
  const Telemetry = sequelize.define('Telemetry', {
    deviceId: DataTypes.STRING,
    deviceHash: DataTypes.STRING,
    subscriptionId: DataTypes.STRING,
    metricTypeId: DataTypes.STRING,
    metricValue: DataTypes.STRING
  }, {});
  Telemetry.associate = function(models) {
    // associations can be defined here
  };
  return Telemetry;
};