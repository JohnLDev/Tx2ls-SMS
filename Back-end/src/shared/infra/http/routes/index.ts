import { Router } from 'express'
import userRouter from '@modules/users/infra/http/routes/userRouter'
import subUserRouter from '@modules/subusers/infra/http/routes/subUserRouter'

const routes = Router()

routes.use('/user', userRouter)
routes.use('/subuser', subUserRouter)

export default routes
