/* eslint-disable class-methods-use-this */
export default class TelemetryController {
    constructor(cache, db) {
        this.cache = cache;
        this.db = db;
    }
  
    getTelemetry = (req, res) =>
    {
      console.log('getTelemetry');
      this.db.all().then(data =>
        {
          return res.status(200).send({
            success: true,
            telemetry: data,
          });
        });
    }

    createTelemetry = (req, res) => {
      if (!req.body.deviceId) {
        return res.status(400).send({
          success: 'false',
          message: 'device id must be supplied',
          body:req.body
        });
      } 
      else if (!req.body.deviceHash) {
        return res.status(400).send({
          success: 'false',
          message: 'device hash must be supplied',
        });
      }
  
      // create a mapping object
      var telemetry = {
        DeviceId : req.body.deviceId,
        DeviceHash : req.body.deviceHash,
        SubscriptionId : req.body.subscriptionId,
        MetricTypeId : req.body.metricTypeId,
        MetricValue : req.body.metricValue
      };
      
      var result = this.cache.save(telemetry);

      return res.status(201).send({
        success: result
      });
    }
}