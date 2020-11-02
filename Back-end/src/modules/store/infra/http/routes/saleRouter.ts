import ensureAuthenticated from '@shared/infra/http/middlewares/ensureaAuthenticated'
import { Router } from 'express'
import SaleController from '../controllers/SaleControllers'

const saleRouter = Router()

const saleController = new SaleController()

saleRouter.use(ensureAuthenticated)

saleRouter.get('/index', saleController.index)
saleRouter.post('/sell', saleController.create)
saleRouter.delete('/revert/:id', saleController.revert)

export default saleRouter
