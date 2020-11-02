import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import User from '../infra/typeorm/entities/User'
import IUserRepository from '../repositories/IUserRepository'

@injectable()
class IndexUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(enterprise_Name?: string): Promise<User[]> {
    if (enterprise_Name) {
      const user = await this.userRepository.findByEnterprise_Name(
        enterprise_Name,
      )
      if (!user || user.length === 0) {
        throw new AppError('Users not found', 404)
      }
      return user
    }
    const users = await this.userRepository.findAll()

    if (!users) {
      throw new AppError('Users not found', 404)
    }
    return users
  }
}

export default IndexUserService
