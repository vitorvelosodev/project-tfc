import ITeams from './ITeams';

export interface ITeamsModel {
  // create(data: ITeams) : Promise<ITeams>
  findAll() : Promise<ITeams[]>,
  findById(id: ITeams['id']) : Promise<ITeams | null>
}
