import bcrypt = require('bcryptjs');
import UserModel from '../models/UserModel';
import IUsers from '../Interfaces/IUsers';
import { ServiceResponse, ServiceResponseError } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';

export default class LoginService {
  constructor(private userModel : UserModel = new UserModel()) {}

  static verifyCredentials(hashedPassword: string, userPassword: IUsers['password']) {
    const passwordMatch = bcrypt.compareSync(userPassword, hashedPassword);
    return passwordMatch;
  }

  static generateToken(email: IUsers['email']) {
    return JWT.createToken({ email });
  }

  // eslint-disable-next-line max-lines-per-function
  public async getUser(email: IUsers['email'], password: IUsers['password'])
    : Promise<ServiceResponse<{ token: string }> | ServiceResponseError> {
    const user = await this.userModel.findOne(email);
    if (user === null) {
      return {
        status: 'NOT_FOUND',
        data: {
          message: 'Invalid email or password',
        },
      };
    }

    const passwordMatch = LoginService.verifyCredentials(user.password, password);

    if (!passwordMatch) {
      return { status: 'INVALID_DATA',
        data: {
          message: 'Invalid email or password',
        } };
    }
    console.log('Cheguei aqui no Service');
    return { status: 'SUCCESSFUL', data: { token: LoginService.generateToken(email) } };
  }
}
