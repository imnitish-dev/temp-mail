import 'reflect-metadata';
import express from 'express';
import { NODE_ENV, PORT } from '@config';

class App {
  public app: express.Application;
  public port: number;
  public env: string;

  constructor() {
    this.app = express();
    this.port = parseInt(PORT, 10);
    this.env = NODE_ENV || 'development';
  }

  public listen() {
    this.app.listen(this.port, () => {
      if (this.env === 'development') {
        console.log(`
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
}
export default App;
