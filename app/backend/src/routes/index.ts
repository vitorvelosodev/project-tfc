import { Router } from 'express';
import teamsRouter from './Teams.routes';
import loginRouter from './Login.routes';
import matchesRouter from './Matches.routes';
import leaderboardRouter from './Leaderboard.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
