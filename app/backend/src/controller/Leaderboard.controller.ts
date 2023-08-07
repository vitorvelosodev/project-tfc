import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  public async homeLeaderboard(_req: Request, res: Response) : Promise<Response> {
    const teamsPlayingHome = await this.leaderboardService.homeLeaderboard();
    return res.status(200).json(teamsPlayingHome.data);
  }

  public async awayLeaderboard(_req: Request, res: Response) : Promise<Response> {
    const teamsPlayingAway = await this.leaderboardService.awayLeaderboard();
    return res.status(200).json(teamsPlayingAway.data);
  }
}
