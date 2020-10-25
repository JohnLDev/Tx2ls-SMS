import { getRepository } from 'typeorm'
import User from '../infra/typeorm/entities/User'
import * as yup from 'yup'

interface IRequest {
  name: string
  email: string
  password: string
  enterprise_Name: string
  whatsapp: number
  requestImages: Express.Multer.File[]
}
class CreateUserService {
  public async execute({
    name,
    email,
    password,
    enterprise_Name,
    whatsapp,
    requestImages,
  }: IRequest): Promise<User> {
    const userRepository = getRepository(User)

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

    const user = userRepository.create(data)
    await userRepository.save(user)
    return user
  }
}

export default CreateUserService
