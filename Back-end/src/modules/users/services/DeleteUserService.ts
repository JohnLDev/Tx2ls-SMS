import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import IUserRepository from '../repositories/IUserRepository'
import { validate } from 'uuid'

import ImageHandler from '@shared/utils/ImageHandler'

@injectable()
class DeleteUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const validId = validate(id)
    if (!validId) {
      throw new AppError('insert a valid id')
    }
    const user = await this.userRepository.findById(id)
    if (!user) {
      throw new AppError('User not found', 404)
    }
    ImageHandler.deleteImage(user.images)
    await this.userRepository.delete(id)
  }
}

export default DeleteUserService
