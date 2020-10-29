import { Router } from 'express'
import multer from 'multer'

import UploadConfig from '@config/upload'
import EnsureAuthenticated from '@modules/users/infra/http/middlewares/ensureaAuthenticated'
import UserController from '@modules/users/infra/http/controllers/UserController'

const userController = new UserController()
const userRouter = Router()
const upload = multer(UploadConfig)

userRouter.get('/index', userController.Index)

userRouter.get('/show/:id', userController.Show)

userRouter.post('/signup', upload.array('images'), userController.Create)

userRouter.post('/login', userController.Login)

userRouter.patch('/verify-email/:verify_Key', userController.VerifyEmail)

userRouter.delete('/userdelete/:id', EnsureAuthenticated, userController.Delete)

userRouter.put(
  '/userupdate/',
  EnsureAuthenticated,
  upload.array('images'),
  userController.Update,
)

export default userRouter
