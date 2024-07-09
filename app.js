const express = require('express');
const logger = require('./logger');
const { fetchData } = require('../secret-manager-dev/index');

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

fetchData().then(() => {
  console.log('Data fetched and environment variables set.');
}).catch((error) => {
  console.error('Failed to fetch data:', error);
});

app.get('/', (req, res) => {
  let sampleData = {
    "user": process.env.DB_USER,
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "database": process.env.DB_NAME
  };
  res.send(sampleData);
});

app.post('/data', (req, res) => {
  const data = { "CLIENT_TOKEN": process.env.CLIENT_TOKEN };
  logger.info(`Data received: ${JSON.stringify(data)}`);
  res.send(`You sent: ${JSON.stringify(data)}`);
});

app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  logger.info(`API is running at http://localhost:${port}`);
});

