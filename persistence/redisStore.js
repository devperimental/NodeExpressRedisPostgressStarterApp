import redis from 'redis';

/* eslint-disable class-methods-use-this */
export default class RedisStore {
    constructor(options) {
      console.log(options.REDIS_PORT);
      console.log(options.REDIS_HOST);
      console.log(options.TELEMETRY_QUEUE);
  
      this.options = options;
      this.client = redis.createClient(this.options.REDIS_PORT, this.options.REDIS_HOST); // this creates a new client
        
      this.client.on('connect', function() {
        console.log('Redis client connected');
      });

      this.client.on('error', function (err) {
        console.log('Something went wrong ' + err);
      });
    }
  
    save = (telemetry) => {

      console.log(this.options.TELEMETRY_QUEUE);
      console.log(JSON.stringify(telemetry));
      this.client.rpush(this.options.TELEMETRY_QUEUE, JSON.stringify(telemetry));

      return true;
    }
}
  