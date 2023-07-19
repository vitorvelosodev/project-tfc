import ITeams from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import SequelizeTeams from '../database/models/SequelizeTeams';
// import { NewEntity } from '../seeders';

export default class TeamsModel implements ITeamsModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    return dbData;
  }
}
