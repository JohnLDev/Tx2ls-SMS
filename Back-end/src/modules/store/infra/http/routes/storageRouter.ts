import ensureAuthenticated from '@shared/infra/http/middlewares/ensureaAuthenticated'
import { Router } from 'express'
import StorageController from '../controllers/StorageController'

const storageRouter = Router()
const storageController = new StorageController()

storageRouter.use(ensureAuthenticated)

storageRouter.get('/index', storageController.IndexStorage)
storageRouter.post('/add', storageController.AddItem)
storageRouter.put('/update/:id', storageController.update)
storageRouter.delete('/delete/:id', storageController.delete)

export default storageRouter
