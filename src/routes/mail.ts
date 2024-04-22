import { Router } from 'express';
import { Routes } from '@/types/routes';
import mailController from '@/controllers/mail';
export class MailRoute implements Routes {
  public path: string;
  public router = Router();

  constructor(path: string) {
    this.path = path;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/test`, mailController.getMail);
  }
}
