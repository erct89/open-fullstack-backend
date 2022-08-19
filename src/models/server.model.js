import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { dbConnection } from '../db/config.js';
import routes from '../routes/index.js';
import { requestUnknown } from '../middlewares/requestUnknown.middleware.js';
import { errorHandler } from '../middlewares/errorHandler.middleware.js';

import Config from '../utils/config.js';
import Logger from '../utils/logger.js';


export class Server {

  constructor() {
    this.app = express();

    this.dbConnected();
    this.middlewares();
    this.routes();
    this.handleErrors();

    this.server = http.createServer(this.app);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
    morgan.token('body', (request) => JSON.stringify( request.body || ''));
    this.app.use(morgan(':method :url :status :total-time[0] - :response-time ms :body'));
  }

  async dbConnected() {
    await dbConnection();
  }

  routes() {
    this.app.use(Config.API_PATHS.blogs, routes.blogs);
    this.app.use(Config.API_PATHS.notes, routes.notes);
    this.app.use(Config.API_PATHS.contacts, routes.contacts);
    this.app.use(Config.API_PATHS.search, routes.search);
    this.app.use(requestUnknown);
  }

  handleErrors() {
    this.app.use(errorHandler);
  }

  listen() {
    this.server.listen(Config.PORT, () => {
      Logger.info(`Server running http://localhost:${Config.PORT}`);
    });
  }
}

export default Server;
