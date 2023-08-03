import { Router } from 'express';
import teamsRouter from './Teams.routes';
import loginRouter from './Login.routes';
import matchesRouter from './Matches.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);

export default router;
