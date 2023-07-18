import TeamsModel from '../database/models/TeamsModel';
import ITeams from '../Interfaces/ITeams';
// import { ITeamsModel } from '../Interfaces/ITeamsModel';
import { ServiceResponse, ServiceResponseError } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  constructor(
    private teamsModel : TeamsModel = new TeamsModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: ITeams['id'])
    : Promise<ServiceResponse<ITeams> | ServiceResponseError> {
    const team = await this.teamsModel.findById(id);
    if (team === null) {
      return { status: 'NOT_FOUND',
        data: { message: `Team of id ${id} not found` } };
    }
    return { status: 'SUCCESSFUL', data: team };
  }
}
