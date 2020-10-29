import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import ConfirmEmailService from '@modules/users/services/ConfirmEmailService'
import CreateUserService from '@modules/users/services/CreateUserService'
import DeleteUserService from '@modules/users/services/DeleteUserService'
import IndexUserService from '@modules/users/services/IndexUserService'
import SendConfirmationEmailService from '@modules/users/services/SendConfirmationEmailService'
import ShowUserService from '@modules/users/services/ShowUserService'
import UpdateUserService from '@modules/users/services/UpdateUserService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class UserController {
  public async Index(request: Request, response: Response): Promise<Response> {
    const { enterprise_Name } = request.query
    const indexUserService = container.resolve(IndexUserService)
    const users = await indexUserService.execute(enterprise_Name as string)

    return response.status(200).json(users)
  }

  public async Show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const showUserService = container.resolve(ShowUserService)
    const user = await showUserService.execute(id)

    return response.status(200).json(user)
  }

  public async Create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, enterprise_Name, whatsapp } = request.body
    const requestImages = request.files as Express.Multer.File[]

    const createUserService = container.resolve(CreateUserService)
    const user = await createUserService.execute({
      name,
      email,
      password,
      enterprise_Name,
      whatsapp,
      requestImages,
    })
    const sendConfirmationEmailService = new SendConfirmationEmailService()
    await sendConfirmationEmailService.execute({
      email: user.email,
      verify_Key: user.verify_Key,
      enterprise_Name: user.enterprise_Name,
      name: user.name,
    })

    return response.status(201).json(user)
  }

  public async Login(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body

    const authenticateUserService = container.resolve(AuthenticateUserService)
    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    })
    return response.status(200).json({ user, token })
  }

  public async VerifyEmail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { verify_Key } = request.params

    const confirmEmailService = container.resolve(ConfirmEmailService)
    const user = await confirmEmailService.execute(verify_Key)
    return response.status(200).json(user)
  }

  public async Delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const deleteUserService = container.resolve(DeleteUserService)
    await deleteUserService.execute(id)

    return response.status(200).json({ message: 'deleted' })
  }

  public async Update(request: Request, response: Response): Promise<Response> {
    const id = request.user.id
    const { name, password, enterprise_Name, whatsapp } = request.body
    const requestImages = request.files as Express.Multer.File[]

    const updateUserService = container.resolve(UpdateUserService)
    const updatedUser = await updateUserService.execute({
      id,
      name,
      password,
      enterprise_Name,
      whatsapp,
      requestImages,
    })
    return response.status(200).json(updatedUser)
  }
}