import ensureAuthenticated from '@shared/infra/http/middlewares/ensureaAuthenticated'
import { Router } from 'express'
import SubUserController from '../controllers/subUserController'

const subUserRouter = Router()
const subUserController = new SubUserController()

subUserRouter.use(ensureAuthenticated)

subUserRouter.get('/index', subUserController.index)

subUserRouter.post('/signup', subUserController.signup)

subUserRouter.post('/login', subUserController.login)

subUserRouter.put('/update/:id', subUserController.update)

subUserRouter.delete('/delete/:id', subUserController.delete)

export default subUserRouter
