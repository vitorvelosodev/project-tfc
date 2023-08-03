import { Request, Router, Response } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import MatchesController from '../controller/Matches.controller';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch(
  '/:id/finish',
  isAuthenticated,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);

export default router;
