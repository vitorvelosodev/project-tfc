import SequelizeTeams from '../database/models/SequelizeTeams';
import IMatches from '../Interfaces/IMatches';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatches';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;
  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbData;
  }

  async findInProgress(bool: string): Promise<IMatches[] | null> {
    let inProgress;
    if (bool === 'true') {
      inProgress = 1;
    } else {
      inProgress = 0;
    }
    console.log(inProgress);
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: {
        inProgress,
      },
    });
    return dbData;
  }
}
