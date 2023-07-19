import { Request, Response } from 'express';
import Service from '../services/Teams.service';

export default class TeamsController {
  constructor(
    private teamsService = new Service(),
  ) {}

  public async getAllTeams(_req: Request, res: Response) : Promise<Response> {
    const serviceResponse = await this.teamsService.getAllTeams();

    return res.status(200).json(serviceResponse.data);
  }

  public async getTeamById(req: Request, res: Response) : Promise<Response> {
    const { id } = req.params;
    const serviceResponse = await this.teamsService.getTeamById(Number(id));
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(404).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}
