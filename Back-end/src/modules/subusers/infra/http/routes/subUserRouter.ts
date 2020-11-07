import ensureAuthenticated from '@shared/infra/http/middlewares/ensureaAuthenticated'
import { Router } from 'express'
import SubUserController from '../controllers/subUserController'

const subUserRouter = Router()
const subUserController = new SubUserController()

subUserRouter.use(ensureAuthenticated)

subUserRouter.get('/index', subUserController.index)

subUserRouter.post('/signup', subUserController.signup)

subUserRouter.post('/login', subUserController.login)

subUserRouter.post(
  '/redefine-password-email',
  subUserController.SendRedefinePasswordEmail,
)

subUserRouter.patch('/redefine-password', subUserController.RedefinePassword)

subUserRouter.put('/update/:id', subUserController.update)

subUserRouter.delete('/delete/:id', subUserController.delete)

export default subUserRouter
