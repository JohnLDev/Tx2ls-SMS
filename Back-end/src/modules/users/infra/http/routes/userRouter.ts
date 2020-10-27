import CreateUserService from '@modules/users/services/CreateUserService'
import { Router } from 'express'
import multer from 'multer'
import { container } from 'tsyringe'
import UploadConfig from '@config/upload'
import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureaAuthenticated'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import ConfirmEmailService from '@modules/users/services/ConfirmEmailService'
import DeleteUserService from '@modules/users/services/DeleteUserService'
import UpdateUserService from '@modules/users/services/UpdateUserService'

const userRouter = Router()
const upload = multer(UploadConfig)

userRouter.post(
  '/signup',
  upload.array('images'),
  async (request, response) => {
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

    return response.status(201).json(user)
  },
)

userRouter.post('/login', async (request, response) => {
  const { password, email } = request.body

  const authenticateUserService = container.resolve(AuthenticateUserService)
  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  })
  return response.status(200).json({ user, token })
})

userRouter.patch('/verify-email/:verify_Key', async (request, response) => {
  const { verify_Key } = request.params

  const confirmEmailService = container.resolve(ConfirmEmailService)
  const user = await confirmEmailService.execute(verify_Key)
  return response.status(200).json(user)
})

userRouter.delete(
  '/userdelete/:id',
  EnsureAuthenticated,
  async (request, response) => {
    const { id } = request.params
    const deleteUserService = container.resolve(DeleteUserService)
    await deleteUserService.execute(id)

    return response.status(200).json({ message: 'deleted' })
  },
)

userRouter.put(
  '/userupdate/',
  EnsureAuthenticated,
  upload.array('images'),
  async (request, response) => {
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
  },
)

export default userRouter
