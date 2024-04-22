import 'reflect-metadata';
import express from 'express';
import { NODE_ENV, PORT, ORIGIN, CREDENTIALS, LOG_FORMAT } from '@config';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { logger, stream } from '@utils/logger';
import { connectMongodb } from '@database';

class App {
  public app: express.Application;
  public port: number;
  public env: string;

  constructor() {
    this.app = express();
    this.port = parseInt(PORT, 10);
    this.env = NODE_ENV || 'development';

    this.initializeMiddlewares();
    logger.info('Middlewares initialized');

    this.connectToDatabase();
    logger.info('Database connected');
  }

  public listen() {
    this.app.listen(this.port, () => {
      if (this.env === 'development') {
        logger.info(`
          .-----------------------------------.
          |                                   |
          |                                   |
          |        ENV: ${this.env}           |
          |  App listening on the port ${this.port}   |
          |                                   |
          |                                   |
          |___________________________________|
          `);
      }
    });
  }

  private initializeMiddlewares() {
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(hpp());
    this.app.use(helmet());
  }

  private async connectToDatabase() {
    await connectMongodb();
  }
}
export default App;
