import { inject, injectable } from 'tsyringe'
import { validate } from 'uuid'
import * as yup from 'yup'
import { hash } from 'bcryptjs'

import User from '../infra/typeorm/entities/User'
import IUserRepository from '../repositories/IUserRepository'
import AppError from '@shared/errors/AppError'
import ImageHandler from '@shared/utils/ImageHandler'
import IUpdateUserDTO from '../dtos/IUpdateUserDTO'

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
  }: IUpdateUserDTO): Promise<User> {
    const validId = validate(id)
    if (!validId) {
      throw new AppError('insert a valid id')
    }
    if (!name && !password && !whatsapp && !requestImages && !enterprise_Name) {
      throw new AppError(
        'you need to inform at least one field to update a user',
      )
    }
    const images = requestImages?.map(image => {
      return { path: image.filename.replace(' ', '_') }
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
      if (images) {
        ImageHandler.deleteImage(images)
      }

      await schema.validate(data, {
        abortEarly: false,
      })
    }

    const user = await this.userRepository.findById(id)

    if (!user) {
      if (images) {
        ImageHandler.deleteImage(images)
      }
      throw new AppError('User not found', 404)
    }

    if (name) {
      user.name = name
    }
    if (password) {
      user.password = await hash(password, 8)
    }
    if (enterprise_Name) {
      const existEnterprise = await this.userRepository.findByEnterprise_Name(
        enterprise_Name,
      )
      if (existEnterprise?.length !== 0) {
        throw new AppError('Enterprise_Name already registered')
      }
      user.enterprise_Name = enterprise_Name
    }
    if (whatsapp) {
      user.whatsapp = whatsapp
    }
    if (requestImages && images) {
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
