import { Request, Response } from 'express';
import LoginService from '../services/Login.service';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public async loginUser(req: Request, res: Response) : Promise<Response> {
    const { email, password } = req.body;

    const serviceResponse = await this.loginService.loginUser(email, password);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(401).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }

  public async getRole(_req: Request, res: Response) : Promise<Response> {
    const role = await this.loginService.getRole();

    console.log(role);

    return res.status(200).json({ role });
  }
}
