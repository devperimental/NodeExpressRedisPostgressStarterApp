import express from 'express';
import bodyParser from 'body-parser';
import router from '../routes/index';

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json({ type: 'application/json' }));
app.use(router);

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});