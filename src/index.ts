import express, { Express } from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import errorHandler from './middlewares/errorHandler';

import router from './routes';

import logger from './utils/logger';

import { PORT } from './config/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

let server: http.Server | undefined;

app.on('ready', () => {
  server = app.listen(PORT, () => logger.info(`Server is listening on port: ${PORT}`));
});

process.on('SIGTERM', () => {
  if (server) {
    server.close(() => {
      logger.info('The server has been stopped.');
    });
  }
});

app.emit('ready');
