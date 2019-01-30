import redis from 'redis';
import 'dotenv/config';
import DbStore from '../persistence/dbStore';

var options = {
    REDIS_PORT : process.env.REDIS_PORT,
    REDIS_HOST : process.env.REDIS_HOST,
    TELEMETRY_QUEUE : process.env.TELEMETRY_QUEUE

};

console.log(options.REDIS_PORT);
console.log(options.REDIS_HOST);
console.log(options.TELEMETRY_QUEUE);

let client = redis.createClient(options.REDIS_PORT, options.REDIS_HOST); // this creates a new client
        
client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', function (err) {
  console.log('Something went wrong ' + err);
});

let rList = [];
let dbStore = new DbStore();

function processItem (err, reply) {

  if(!err)
  {
    if (reply)
    {
      console.log('reply[0]');
     
      console.log(reply[0]);
     
      console.log('reply[1]');
      console.log(reply[1]);
      rList.push(reply[1]);

      var telemetry = JSON.parse(reply[1]);

      dbStore.create(telemetry);      
    }
  }
  else
  {
    console.log(err);
  }

  setTimeout(popItem, 100);
}

function popItem () {
  client.blpop(options.TELEMETRY_QUEUE, 1, processItem);
  console.log(rList.length);
}

popItem();