import IMatches from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/MatchesModel';

// interface IMatchedExtended extends IMatches {
//   homeTeam: { teamName: string }
//   awayTeam: { teamName: string }
// }

export default class LeaderboardService {
  constructor(
    private matchesModel : MatchesModel = new MatchesModel(),
  ) {}

  public async homeLeaderboard(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.findAll();

    return { status: 'SUCCESSFUL', data: matches };
  }
}

// Formato que quer receber
// {
//   "name": "Corinthians",
//   "totalPoints": 6,
//   "totalGames": 2,
//   "totalVictories": 2,
//   "totalDraws": 0,
//   "totalLosses": 0,
//   "goalsFavor": 6,
//   "goalsOwn": 1,
// },

// Formato da minha função de matches
// [
//   {
//     "id": 1,
//     "homeTeamId": 16,
//     "homeTeamGoals": 1,
//     "awayTeamId": 8,
//     "awayTeamGoals": 1,
//     "inProgress": false,
//     "homeTeam": {
//       "teamName": "São Paulo"
//     },
//     "awayTeam": {
//       "teamName": "Grêmio"
//     }
//   },
//   {
//     "id": 2,
//     "homeTeamId": 9,
//     "homeTeamGoals": 1,
//     "awayTeamId": 14,
//     "awayTeamGoals": 1,
//     "inProgress": false,
//     "homeTeam": {
//       "teamName": "Internacional"
//     },
//   }
// ]
