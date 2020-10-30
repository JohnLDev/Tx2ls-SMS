import { inject, injectable } from 'tsyringe'
import SubUser from '../infra/typeorm/entities/SubUser'
import ISubUserRepository from '../repositories/ISubUserRepository'
import * as yup from 'yup'
import { hash } from 'bcryptjs'

interface IRequest {
  name: string
  email: string
  password: string
  user_id: string
}
@injectable()
export default class CreateSubUserService {
  constructor(
    @inject('SubUserRepository')
    private SubUserRepository: ISubUserRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    user_id,
  }: IRequest): Promise<SubUser> {
    const data = {
      name,
      email,
      password,
      user_id,
    }

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().min(6).required(),
      user_id: yup.string().required(),
    })
    await schema.validate(data)
    const hashedPassword = await hash(password, 8)
    data.password = hashedPassword
    const SubUser = await this.SubUserRepository.create(data)

    return SubUser
  }
}
