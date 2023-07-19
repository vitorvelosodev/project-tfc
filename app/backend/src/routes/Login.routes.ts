import { Router, Request, Response } from 'express';
import LoginController from '../controller/Login.controller';
import verifyLoginCredentials from '../middlewares/verifyLoginCredentials';
import isAuthenticated from '../middlewares/isAuthenticated';

const loginController = new LoginController();

const loginRouter = Router();

loginRouter.post(
  '/',
  verifyLoginCredentials,
  (req: Request, res: Response) => loginController.loginUser(req, res),
);

loginRouter.get(
  '/role',
  isAuthenticated,
  (req: Request, res: Response) => loginController.getRole(req, res),
);

export default loginRouter;
