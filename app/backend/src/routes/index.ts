import { Router } from 'express';
import teamsRouter from './Teams.routes';

const router = Router();

router.use('/teams', teamsRouter);
// router.get('/teams', (req: any, res: any) => ({ message: 'running' }));

export default router;
