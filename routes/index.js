import express from 'express';
import RedisStore from '../persistence/redisStore';
import DbStore from '../persistence/dbStore';
import TelemetryController from '../controller/telemetryController';
import 'dotenv/config';

const router = express.Router();

var options = {
    REDIS_PORT : process.env.REDIS_PORT,
    REDIS_HOST : process.env.REDIS_HOST,
    TELEMETRY_QUEUE : process.env.TELEMETRY_QUEUE
};
const redisTelemetryStore = new RedisStore(options);
const dbStore = new DbStore(options);

const telemetryController = new TelemetryController(redisTelemetryStore, dbStore);

router.post('/api/v1/telemetry', telemetryController.createTelemetry);
router.get('/api/v1/telemetry', telemetryController.getTelemetry);

export default router;