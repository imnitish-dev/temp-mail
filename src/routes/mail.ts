import { Router } from 'express';
import { Routes } from '@/types/routes';

export class MailRoute implements Routes {
  public path: string;
  public router = Router();

  constructor(path: string) {
    this.path = path;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/test`, (req, res) => {
      res.send('Hello from mail route');
    });
  }
}
