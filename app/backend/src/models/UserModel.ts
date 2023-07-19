import IUsers from '../Interfaces/IUsers';
import { IUserModel } from '../Interfaces/IUserModel';
import SequelizeUsers from '../database/models/SequelizeUsers';

export default class UserModel implements IUserModel {
  private model = SequelizeUsers;

  async findOne(email: IUsers['email']): Promise<IUsers | null> {
    const dbData = await this.model.findOne({ where: { email } });
    return !dbData ? null : dbData;
  }
}
