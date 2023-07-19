import { Router, Request, Response } from 'express';
import LoginController from '../controller/Login.controller';
import verifyLoginCredentials from '../middlewares/verifyLoginCredentials';

const loginController = new LoginController();

const loginRouter = Router();

loginRouter.post(
  '/',
  verifyLoginCredentials,
  (req: Request, res: Response) => loginController.getUser(req, res),
);

export default loginRouter;
