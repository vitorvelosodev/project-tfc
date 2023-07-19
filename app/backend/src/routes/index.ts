import { Router } from 'express';
import teamsRouter from './Teams.routes';
import loginRouter from './Login.routes';
import verifyLoginCredentials from '../middlewares/verifyLoginCredentials';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', verifyLoginCredentials, loginRouter);

export default router;
