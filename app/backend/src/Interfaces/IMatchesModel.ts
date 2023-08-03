import IMatches from './IMatches';

export interface IMatchesModel {
  findAll() : Promise<IMatches[]>
  findInProgress(bool: string) : Promise<IMatches[] | null>
}
