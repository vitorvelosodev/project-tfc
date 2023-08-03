import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) : Promise<Response> {
    const { inProgress } = req.query;

    if (inProgress) {
      const serviceData = await this.matchesService
        .getMatchesInProgress(inProgress as unknown as string);
      return res.status(200).json(serviceData.data);
    }

    const serviceData = await this.matchesService.getAllMatches();
    return res.status(200).json(serviceData.data);
  }

  public async finishMatch(req: Request, res: Response) : Promise<Response> {
    const { id } = req.params;
    const finishGame = await this.matchesService.finishMatch(id as unknown as number);
    return res.status(200).json(finishGame.data);
  }
}
