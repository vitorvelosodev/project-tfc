import IUsers from './IUsers';

export interface IUserModel {
  findOne(email: IUsers['email'], password: IUsers['password']): Promise<IUsers | null>,
}
