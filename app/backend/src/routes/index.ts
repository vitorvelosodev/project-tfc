import { Router } from 'express';
import teamsRouter from './Teams.routes';
import loginRouter from './Login.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);

export default router;
