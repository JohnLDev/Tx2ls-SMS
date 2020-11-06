import { inject, injectable } from 'tsyringe'
import { validate } from 'uuid'
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
    const validId = validate(verify_Key)
    if (!validId) {
      throw new AppError('insert a valid verify_Key')
    }
    const user = await this.userRepository.findByVerify_Key(verify_Key)

    if (!user) {
      throw new AppError('incorrect verify_Key', 404)
    }
    if (user.is_Verify === true) {
      throw new AppError('email already verified')
    }
    user.is_Verify = true
    this.userRepository.update(user)
    return user
  }
}
