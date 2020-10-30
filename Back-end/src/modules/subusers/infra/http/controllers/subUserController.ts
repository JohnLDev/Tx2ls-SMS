import AuthenticateSubUserService from '@modules/subusers/services/AuthenticateSubUserService'
import CreateSubUserService from '@modules/subusers/services/CreateSubUserService'
import IndexSubUserService from '@modules/subusers/services/IndexSubUserService'
import { Response, Request } from 'express'
import { container } from 'tsyringe'

export default class SubUserController {
  public async signup(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    const user_id = request.user.id

    const createSubUserService = container.resolve(CreateSubUserService)
    const SubUser = await createSubUserService.execute({
      name,
      email,
      password,
      user_id,
    })

    return response.status(201).json(SubUser)
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const user_id = request.user.id

    const authenticateSubUserService = container.resolve(
      AuthenticateSubUserService,
    )
    const { subUser, token } = await authenticateSubUserService.execute({
      email,
      password,
      user_id,
    })

    return response.status(200).json({ subUser, token })
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const indexSubUserService = container.resolve(IndexSubUserService)
    const subUsers = await indexSubUserService.execute(user_id)

    return response.status(200).json(subUsers)
  }
}
