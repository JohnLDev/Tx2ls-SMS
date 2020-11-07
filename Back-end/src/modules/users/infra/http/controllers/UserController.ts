import CreateSubUserService from '@modules/subusers/services/CreateSubUserService'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import ConfirmEmailService from '@modules/users/services/ConfirmEmailService'
import CreateUserService from '@modules/users/services/CreateUserService'
import DeleteUserService from '@modules/users/services/DeleteUserService'
import IndexUserService from '@modules/users/services/IndexUserService'
import SendConfirmationEmailService from '@modules/users/services/SendConfirmationEmailService'
import SendRedefinitionPasswordEmail from '@modules/users/services/SendRedefinitionPasswordEmail'
import ShowUserService from '@modules/users/services/ShowUserService'
import UpdateUserService from '@modules/users/services/UpdateUserService'
import UserView from '@modules/users/views/UserView'
import SubUserView from '@modules/subusers/views/SubUserView'
import RedefinitionPasswordService from '@modules/users/services/RedefinitionPasswordService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class UserController {
  public async Index(request: Request, response: Response): Promise<Response> {
    const { enterprise_Name } = request.query
    const indexUserService = container.resolve(IndexUserService)
    const users = await indexUserService.execute(enterprise_Name as string)

    return response.status(200).json(UserView.renderMany(users))
  }

  public async Show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const showUserService = container.resolve(ShowUserService)
    const user = await showUserService.execute(id)

    return response.status(200).json(UserView.render(user))
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

    return response.status(201).json(UserView.render(user))
  }

  public async Login(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body

    const authenticateUserService = container.resolve(AuthenticateUserService)
    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    })
    return response.status(200).json({ user: UserView.render(user), token })
  }

  public async VerifyEmail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { verify_Key } = request.params

    const confirmEmailService = container.resolve(ConfirmEmailService)
    const user = await confirmEmailService.execute(verify_Key)
    const createSubUserService = container.resolve(CreateSubUserService)
    const subUser = await createSubUserService.execute({
      name: user.name,
      email: user.email,
      password: 'administrator',
      user_id: user.id,
      is_Adm: true,
    })

    return response.status(200).json({
      subUser: SubUserView.render(subUser),
    })
  }

  public async SendRedefinePasswordEmail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { email } = request.body

    const sendRedefinitionPasswordEmail = container.resolve(
      SendRedefinitionPasswordEmail,
    )
    await sendRedefinitionPasswordEmail.execute(email)

    return response.status(200).json({ message: 'email has been sended' })
  }

  public async RedefinePassword(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { password, passwordAgain, validationKey } = request.body

    const redefinitionPasswordService = container.resolve(
      RedefinitionPasswordService,
    )
    const user = await redefinitionPasswordService.execute({
      password,
      passwordAgain,
      validationKey,
    })

    return response.status(200).json({ user: UserView.render(user) })
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
    return response.status(200).json(UserView.render(updatedUser))
  }
}
