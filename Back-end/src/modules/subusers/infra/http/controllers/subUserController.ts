import AuthenticateSubUserService from '@modules/subusers/services/AuthenticateSubUserService'
import CreateSubUserService from '@modules/subusers/services/CreateSubUserService'
import DeleteSubUserService from '@modules/subusers/services/DeleteSubUserService'
import IndexSubUserService from '@modules/subusers/services/IndexSubUserService'
import UpdateSubUserService from '@modules/subusers/services/UpdateSubUserService'
import SubUserView from '@modules/subusers/views/SubUserView'
import SendRedefinitionPasswordEmail from '@modules/subusers/services/SendRedefinitionPasswordEmail'
import RedefinitionPasswordService from '@modules/subusers/services/RedefinitionPasswordService'
import { Response, Request } from 'express'
import { container } from 'tsyringe'

export default class SubUserController {
  public async signup(request: Request, response: Response): Promise<Response> {
    const { name, email, password, is_Adm } = request.body
    const user_id = request.user.id

    const createSubUserService = container.resolve(CreateSubUserService)
    const SubUser = await createSubUserService.execute({
      name,
      email,
      password,
      user_id,
      is_Adm,
    })

    return response.status(201).json(SubUserView.render(SubUser))
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

    return response
      .status(200)
      .json({ subUser: SubUserView.render(subUser), token })
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name } = request.query

    const indexSubUserService = container.resolve(IndexSubUserService)
    const subUsers = await indexSubUserService.execute({
      user_id,
      name: (name as unknown) as string,
    })

    return response.status(200).json(SubUserView.renderMany(subUsers))
  }

  public async SendRedefinePasswordEmail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body
    const id = request.user.id

    const sendRedefinitionPasswordEmail = container.resolve(
      SendRedefinitionPasswordEmail,
    )
    await sendRedefinitionPasswordEmail.execute(email, id)

    return response.status(200).json({ message: 'email has been sended' })
  }

  public async RedefinePassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { password, passwordAgain, validationKey } = request.body
    const id = request.user.id

    const redefinitionPasswordService = container.resolve(
      RedefinitionPasswordService,
    )
    const subUser = await redefinitionPasswordService.execute({
      password,
      passwordAgain,
      validationKey,
      user_id: id,
    })

    return response.status(200).json({ user: SubUserView.render(subUser) })
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    const user_id = request.user.id
    const { id } = request.params

    const updateSubUserService = container.resolve(UpdateSubUserService)
    const SubUser = await updateSubUserService.execute({
      name,
      email,
      password,
      user_id,
      id,
    })

    return response.status(201).json(SubUserView.render(SubUser))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { id } = request.params
    const deleteSubUserService = container.resolve(DeleteSubUserService)
    await deleteSubUserService.execute({ id, user_id })

    return response.status(200).json({ message: 'SubUser Deleted' })
  }
}
