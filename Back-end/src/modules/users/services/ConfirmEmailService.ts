import AppError from '@shared/errors/AppError'
import { getRepository } from 'typeorm'
import User from '../infra/typeorm/entities/User'

export default class ConfirmEmailService {
  public async execute(verify_Key: string): Promise<User> {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne({
      where: {
        verify_Key,
      },
    })
    if (!user) {
      throw new AppError('incorrect verify_Key', 404)
    }
    user.is_Verify = true
    userRepository.save(user)
    return user
  }
}
