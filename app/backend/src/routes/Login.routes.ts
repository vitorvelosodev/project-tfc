import { Router, Request, Response } from 'express';
import LoginController from '../controller/Login.controller';

const loginController = new LoginController();

const loginRouter = Router();

loginRouter.post('/', (req: Request, res: Response) => loginController.getUser(req, res));

export default loginRouter;
