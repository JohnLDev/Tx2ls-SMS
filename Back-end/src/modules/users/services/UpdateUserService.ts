import { inject, injectable } from 'tsyringe'
import { validate } from 'uuid'

import User from '../infra/typeorm/entities/User'
import IUserRepository from '../repositories/IUserRepository'
import * as yup from 'yup'
import AppError from '@shared/errors/AppError'
import ImageHandler from '@shared/utils/ImageHandler'

interface IRequest {
  id: string
  name: string
  password: string
  enterprise_Name: string
  whatsapp: number
  requestImages: Express.Multer.File[]
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    id,
    name,
    password,
    enterprise_Name,
    whatsapp,
    requestImages,
  }: IRequest): Promise<User> {
    const validId = validate(id)
    if (!validId) {
      throw new AppError('insert a valid id')
    }
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const data = {
      id,
      name,
      password,
      enterprise_Name,
      whatsapp,
      images,
    }
    const schema = yup.object().shape({
      id: yup.string(),
      name: yup.string(),
      password: yup.string().min(6),
      enterprise_Name: yup.string().max(40),
      whatsapp: yup.number(),
      images: yup.array(
        yup.object().shape({
          path: yup.string(),
        }),
      ),
    })
    const isValid = await schema.isValid(data, {
      abortEarly: false,
    })
    if (!isValid) {
      ImageHandler.deleteImage(images)
      await schema.validate(data, {
        abortEarly: false,
      })
    }
    const user = await this.userRepository.findById(id)
    if (!user) {
      ImageHandler.deleteImage(images)
      throw new AppError('User not found', 404)
    }

    if (name) {
      user.name = name
    }
    if (password) {
      user.password = password
    }
    if (enterprise_Name) {
      user.enterprise_Name = enterprise_Name
    }
    if (whatsapp) {
      user.whatsapp = whatsapp
    }
    if (requestImages) {
      ImageHandler.deleteImage(user.images)
      ImageHandler.renameImage(user.enterprise_Name, images)

      user.images.map(
        (img, index) =>
          (img.path =
            user.enterprise_Name.replace(' ', '_') + images[index].path),
      )
    }
    await this.userRepository.update(user)
    return user
  }
}

export default UpdateUserService
