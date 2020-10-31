import ensureAuthenticated from '@shared/infra/http/middlewares/ensureaAuthenticated'
import { Router } from 'express'
import SaleController from '../controllers/SaleControllers'

const saleRouter = Router()

const saleController = new SaleController()

saleRouter.use(ensureAuthenticated)

saleRouter.post('/sell', saleController.create)

export default saleRouter
