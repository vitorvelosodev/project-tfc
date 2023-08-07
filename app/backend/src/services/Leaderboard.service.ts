import IMatches from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/MatchesModel';

interface ILeaderboard {
  name: string
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
}

interface IMatchesPlus extends IMatches {
  homeTeam: { teamName: string },
  awayTeam: { teamName: string }
}

export default class LeaderboardService {
  constructor(
    private matchesModel : MatchesModel = new MatchesModel(),
  ) {}

  static generateInitialLeaderboard(matches: IMatches[]) {
    return matches.map((match: any) => (
      {
        name: match.homeTeam.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
      }
    ));
  }

  static win(argLeaderboard: ILeaderboard[], i) {
    const leaderboard = argLeaderboard;
    leaderboard[i].totalPoints += 3;
    leaderboard[i].totalVictories += 1;

    return leaderboard;
  }

  static draw(argLeaderboard: ILeaderboard[], i) {
    const leaderboard = argLeaderboard;
    leaderboard[i].totalDraws += 1;
    leaderboard[i].totalPoints += 1;

    return leaderboard;
  }

  static createHomeLB(initialLeaderboard: ILeaderboard[], matches: IMatchesPlus[]): ILeaderboard[] {
    let leaderBoard = initialLeaderboard;
    leaderBoard.forEach((team, i) => {
      matches.forEach((match) => {
        if (match.homeTeam.teamName === team.name) {
          leaderBoard[i].totalGames += 1;
          leaderBoard[i].goalsFavor += match.homeTeamGoals;
          leaderBoard[i].goalsOwn += match.awayTeamGoals;
          if (match.homeTeamGoals > match.awayTeamGoals) {
            leaderBoard = LeaderboardService.win(leaderBoard, i);
          } else if (match.homeTeamGoals < match.awayTeamGoals) {
            leaderBoard[i].totalLosses += 1;
          } else {
            leaderBoard = LeaderboardService.draw(leaderBoard, i);
          }
        }
      });
    });
    return leaderBoard;
  }

  static createAwayLB(initialLeaderboard: ILeaderboard[], matches: IMatchesPlus[]): ILeaderboard[] {
    let leaderBoard = initialLeaderboard;
    leaderBoard.forEach((team, i) => {
      matches.forEach((match) => {
        if (match.awayTeam.teamName === team.name) {
          leaderBoard[i].totalGames += 1;
          leaderBoard[i].goalsFavor += match.awayTeamGoals;
          leaderBoard[i].goalsOwn += match.homeTeamGoals;
          if (match.awayTeamGoals > match.homeTeamGoals) {
            leaderBoard = LeaderboardService.win(leaderBoard, i);
          } else if (match.awayTeamGoals < match.homeTeamGoals) {
            leaderBoard[i].totalLosses += 1;
          } else {
            leaderBoard = LeaderboardService.draw(leaderBoard, i);
          }
        }
      });
    });
    return leaderBoard;
  }

  public async homeLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const matches = await this.matchesModel.findInProgress('false');

    const initialLeaderboard = LeaderboardService.generateInitialLeaderboard(matches);

    const leaderboard = LeaderboardService.createHomeLB(initialLeaderboard, matches as any);

    return { status: 'SUCCESSFUL', data: leaderboard };
  }

  public async awayLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const matches = await this.matchesModel.findInProgress('false');

    const initialLeaderboard = LeaderboardService.generateInitialLeaderboard(matches);

    const leaderboard = LeaderboardService.createAwayLB(initialLeaderboard, matches as any);

    return { status: 'SUCCESSFUL', data: leaderboard };
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
