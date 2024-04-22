import { Router } from 'express';

import { UserRoute } from '@/routes/user';
import { MailRoute } from '@/routes/mail';
import { Routes } from '@/types/routes';

const routes: Routes[] = [new UserRoute('/users'), new MailRoute('/mail')];
class Route {
  public router = Router();

  constructor() {
    this.initializeRoutes(routes);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.router.use('/', route.router);
    });
  }
}
export const myRoute = new Route();
export default routes;
