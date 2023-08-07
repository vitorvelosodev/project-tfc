import MatchesModel from '../models/MatchesModel';
import IMatches from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IUpdateBody from '../Interfaces/IUpdateBody';
import ICreateMatch from '../Interfaces/ICreateBody';
import TeamsModel from '../models/TeamsModel';
// ServiceResponseError

export default class MatchesService {
  constructor(
    private matchesModel : MatchesModel = new MatchesModel(),
    private teamsModel : TeamsModel = new TeamsModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesInProgress(bool: string) : Promise<ServiceResponse<IMatches[]>> {
    const allMatchesInProgress = await this.matchesModel.findInProgress(bool);
    return { status: 'SUCCESSFUL', data: allMatchesInProgress };
  }

  public async finishMatch(id: number) : Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.finishMatch(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(id: number, body: IUpdateBody)
    : Promise<ServiceResponse<{ message: string }>> {
    await this.matchesModel.updateMatch(id, body);
    return { status: 'SUCCESSFUL', data: { message: 'Match updated' } };
  }

  public async createMatch(body : ICreateMatch)
    : Promise<ServiceResponse<IMatches>> {
    const allTeams = await this.teamsModel.findAll();
    const allTeamsId = allTeams.map((team) => team.id);
    const { homeTeamId, awayTeamId } = body;
    if (allTeamsId.includes(homeTeamId) && allTeamsId.includes(awayTeamId)) {
      const createdMatch = await this.matchesModel.createMatch(body);
      return { status: 'SUCCESSFUL', data: createdMatch };
    }
    return { status: 'INVALID_DATA', data: { message: 'There is no team with such id!' } };
  }
}
