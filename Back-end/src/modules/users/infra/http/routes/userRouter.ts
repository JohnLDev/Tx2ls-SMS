import CreateUserService from '@modules/users/services/CreateUserService'
import { Router } from 'express'
import multer from 'multer'

import UploadConfig from '@config/upload'

const userRouter = Router()
const upload = multer(UploadConfig)

userRouter.post(
  '/signup',
  upload.array('images'),
  async (request, response) => {
    const { name, email, password, enterprise_Name, whatsapp } = request.body
    const requestImages = request.files as Express.Multer.File[]
    const createUserService = new CreateUserService()
    const user = await createUserService.execute({
      name,
      email,
      password,
      enterprise_Name,
      whatsapp,
      requestImages,
    })

    return response.status(200).json(user)
  },
)

export default userRouter
