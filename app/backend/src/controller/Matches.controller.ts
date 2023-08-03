import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) : Promise<Response> {
    const { inProgress } = req.query;

    console.log(inProgress);
    if (inProgress) {
      const serviceData = await this.matchesService
        .getMatchesInProgress(inProgress as unknown as string);
      return res.status(200).json(serviceData.data);
    }

    const serviceData = await this.matchesService.getAllMatches();
    return res.status(200).json(serviceData.data);
  }

  // public async getInProgress(req: Request, res: Response) : Promise<Response> {
  //   const bool = req.query.inProgress;
  //   const serviceData = await this.matchesService.get
  // }
}
