import 'reflect-metadata'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { validate } from 'uuid'
import User from '../infra/typeorm/entities/User'
import IUserRepository from '../repositories/IUserRepository'

@injectable()
class ShowUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(id: string): Promise<User> {
    if (!validate(id)) {
      throw new AppError('Id is not valid')
    }
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new AppError('User not found', 404)
    }
    return user
  }
}
export default ShowUserService
