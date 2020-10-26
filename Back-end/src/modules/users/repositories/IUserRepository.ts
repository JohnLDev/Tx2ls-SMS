import ICreateUser from '../dtos/ICreateUserDTO'
import User from '../infra/typeorm/entities/User'

export default interface IUserRepository {
  create(data: ICreateUser): Promise<User>
  findByVerify_Key(verify_Key: string): Promise<User | undefined>
}
