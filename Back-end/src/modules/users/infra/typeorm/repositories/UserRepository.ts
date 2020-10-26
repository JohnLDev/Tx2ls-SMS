import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import { getRepository, Repository } from 'typeorm'
import User from '../entities/User'

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async create({
    name,
    email,
    password,
    enterprise_Name,
    whatsapp,
    images,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      enterprise_Name,
      whatsapp,
      images,
    })
    await this.ormRepository.save(user)
    return user
  }

  public async findByVerify_Key(verify_Key: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        verify_Key,
      },
    })
    return user
  }
}

export default UserRepository
