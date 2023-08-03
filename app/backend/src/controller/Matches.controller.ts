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
    const finishedMatch = await this.matchesService.finishMatch(id as unknown as number);
    return res.status(200).json(finishedMatch.data);
  }

  public async updateMatch(req: Request, res: Response) : Promise<Response> {
    const { id } = req.params;
    const { body } = req;
    const updatedMatch = await this.matchesService.updateMatch(id as unknown as number, body);
    return res.status(200).json(updatedMatch.data);
  }

  public async createMatch(req: Request, res: Response) : Promise<Response> {
    const { body } = req;
    const { homeTeamId, awayTeamId } = body;
    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const createMatch = await this.matchesService.createMatch(body);
    if (createMatch.status !== 'SUCCESSFUL') {
      return res.status(404).json(createMatch.data);
    }
    return res.status(201).json(createMatch.data);
  }
}
