import { Router } from 'express'
import userRouter from '@modules/users/infra/http/routes/userRouter'
import subUserRouter from '@modules/subusers/infra/http/routes/subUserRouter'
import storageRouter from '@modules/store/infra/http/routes/storageRouter'
import saleRouter from '@modules/store/infra/http/routes/saleRouter'

const routes = Router()

routes.use('/user', userRouter)
routes.use('/subuser', subUserRouter)
routes.use('/storage', storageRouter)
routes.use('/sale', saleRouter)

export default routes
