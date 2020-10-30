import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureaAuthenticated'
import { Router } from 'express'
import SubUserController from '../controllers/subUserController'
import ensureSubAuthenticated from '../middlewares/ensureSubAuthenticated'

const subUserRouter = Router()
const subUserController = new SubUserController()

subUserRouter.use(ensureAuthenticated)

subUserRouter.get('/index', ensureSubAuthenticated, subUserController.index)
subUserRouter.post('/signup', subUserController.signup)
subUserRouter.post('/login', subUserController.login)

export default subUserRouter
