import models from '../server/models';

/* eslint-disable class-methods-use-this */
export default class DbStore {
    constructor(options) {

    }
  
    all = () => {
        return models.Telemetry.all();
    }

    create = (telemetry) => {
        var data = {
            "deviceId": telemetry.DeviceId,
            "deviceHash": telemetry.DeviceHash,
            "subscriptionId": telemetry.SubscriptionId,
            "metricTypeId": telemetry.MetricTypeId,
            "metricValue": telemetry.MetricValue
        };

        models.Telemetry.create(data).then(telemetry => {return telemetry;});
    }
}