import SequelizeTeams from '../database/models/SequelizeTeams';
import IMatches from '../Interfaces/IMatches';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import IUpdateBody from '../Interfaces/IUpdateBody';
import ICreateMatch from '../Interfaces/ICreateBody';

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

  async findInProgress(bool: string): Promise<IMatches[]> {
    let inProgress;
    if (bool === 'true') {
      inProgress = 1;
    } else {
      inProgress = 0;
    }

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

  async finishMatch(id: number): Promise<null> {
    await this.model.update(
      {
        inProgress: false,
      },
      {
        where: { id },
      },
    );

    return null;
  }

  async updateMatch(id: number, body: IUpdateBody): Promise<null> {
    await this.model.update(
      {
        homeTeamGoals: body.homeTeamGoals,
        awayTeamGoals: body.awayTeamGoals,
      },
      {
        where: { id },
      },
    );

    return null;
  }

  async createMatch(body: ICreateMatch): Promise<IMatches> {
    const { awayTeamGoals,
      homeTeamGoals,
      awayTeamId,
      homeTeamId } = body;
    const createdMatch = await this.model.create(
      {
        awayTeamGoals,
        homeTeamGoals,
        awayTeamId,
        homeTeamId,
        inProgress: true,
      },
    );

    return createdMatch.dataValues;
  }
}
