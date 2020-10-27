import { inject, injectable } from 'tsyringe'

import IUserRepository from '../repositories/IUserRepository'
import AppError from '@shared/errors/AppError'
import User from '../infra/typeorm/entities/User'

@injectable()
export default class ConfirmEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(verify_Key: string): Promise<User> {
    const user = await this.userRepository.findByVerify_Key(verify_Key)
    if (!user) {
      throw new AppError('incorrect verify_Key', 404)
    }
    user.is_Verify = true
    this.userRepository.update(user)
    return user
  }
}
