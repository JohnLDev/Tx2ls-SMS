import User from '../infra/typeorm/entities/User'
import * as yup from 'yup'

import IUserRepository from '../repositories/IUserRepository'
import { injectable, inject } from 'tsyringe'
import SendConfirmationEmailService from './SendConfirmationEmailService'

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
    const images = requestImages.map(image => {
      return { path: image.filename }
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
    await schema.validate(data, {
      abortEarly: false,
    })

    const user = await this.userRepository.create(data)

    // const transport = Nodemailer.createTransport({
    //   host: 'smtp.mailtrap.io',
    //   port: 2525,
    //   auth: {
    //     user: 'b089cbacf6346c',
    //     pass: 'da2d2b9799cf99',
    //   },
    // })
    const sendConfirmationEmailService = new SendConfirmationEmailService()
    await sendConfirmationEmailService.execute({
      email: user.email,
      verify_Key: user.verify_Key,
      enterprise_Name: user.enterprise_Name,
      name: user.name,
    })

    return user
  }
}

export default CreateUserService
