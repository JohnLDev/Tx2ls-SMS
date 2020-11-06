import User from '../infra/typeorm/entities/User'
import * as yup from 'yup'
import { hash } from 'bcryptjs'

import IUserRepository from '../repositories/IUserRepository'
import { injectable, inject } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import ImageHandler from '@shared/utils/ImageHandler'

interface IRequest {
  name: string
  email: string
  password: string
  enterprise_Name: string
  whatsapp: number
  requestImages: Express.Multer.File[]
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    enterprise_Name,
    whatsapp,
    requestImages,
  }: IRequest): Promise<User> {
    if (
      !name ||
      !email ||
      !password ||
      !enterprise_Name ||
      !whatsapp ||
      !requestImages
    ) {
      throw new AppError('Please inform all fields')
    }
    const images = requestImages.map(image => {
      return { path: image.filename.replace(' ', '_') }
    })
    const data = {
      name,
      email,
      password,
      enterprise_Name,
      whatsapp,
      images,
    }
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      enterprise_Name: yup.string().required().max(40),
      whatsapp: yup.number().required(),
      images: yup
        .array(
          yup.object().shape({
            path: yup.string().required(),
          }),
        )
        .required(),
    })
    const isValid = await schema.isValid(data, {
      abortEarly: false,
    })
    if (!isValid) {
      ImageHandler.deleteImage(images)
      await schema.validate(data, { abortEarly: false })
    }

    const existentUser = await this.userRepository.findByEmail(email)
    const existentEnterpriseName = await this.userRepository.findByEnterprise_Name(
      enterprise_Name,
    )

    if (existentUser) {
      ImageHandler.deleteImage(images)
      throw new AppError('Email already exists')
    }

    if (existentEnterpriseName?.length !== 0) {
      ImageHandler.deleteImage(images)
      throw new AppError('enterprise_Name already exists')
    }

    data.images = ImageHandler.renameImage(enterprise_Name, images)
    const hashedPassword = await hash(password, 8)
    data.password = hashedPassword

    const user = await this.userRepository.create(data)

    return user
  }
}

export default CreateUserService
