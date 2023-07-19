import { Request, Response } from 'express';
import LoginService from '../services/Login.service';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public async getUser(req: Request, res: Response) : Promise<Response> {
    const { email, password } = req.body;
    console.log('Cheguei no controller', email, password);
    const serviceResponse = await this.loginService.getUser(email, password);
    console.log('Controller', serviceResponse);
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(401).json(serviceResponse.data);
    }
    return res.status(200).json(serviceResponse.data);
  }
}
