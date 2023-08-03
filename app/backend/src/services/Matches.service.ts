import MatchesModel from '../models/MatchesModel';
import IMatches from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
// ServiceResponseError

export default class MatchesService {
  constructor(
    private matchesModel : MatchesModel = new MatchesModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesInProgress(bool: string) : Promise<ServiceResponse<IMatches[] | null>> {
    const allMatchesInProgress = await this.matchesModel.findInProgress(bool);
    return { status: 'SUCCESSFUL', data: allMatchesInProgress };
  }
}
