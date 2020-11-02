import AddItemToStorageService from '@modules/store/services/AddItemToStorageService'
import IndexStorageService from '@modules/store/services/IndexStorageService'
import DeleteItemFromStorageService from '@modules/store/services/DeleteItemFromStorageService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import UpdateItemFromStorageService from '@modules/store/services/UpdateItemFromStorageService'
import StorageView from '../../../views/StorageView'

class StorageController {
  public async AddItem(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, brand, price, amount } = request.body
    const user_id = request.user.id
    const addItemToStorage = container.resolve(AddItemToStorageService)
    const item = await addItemToStorage.execute({
      name,
      brand,
      price,
      amount,
      user_id,
    })
    return response.status(201).json(StorageView.render(item))
  }

  public async IndexStorage(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, brand } = request.query
    const user_id = request.user.id
    const indexStorageService = container.resolve(IndexStorageService)

    const storage = await indexStorageService.execute({
      name: (name as unknown) as string,
      brand: (brand as unknown) as string,
      user_id,
    })
    return response.status(200).json(StorageView.renderMany(storage))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { id } = request.params

    const deleteItemFromStorageService = container.resolve(
      DeleteItemFromStorageService,
    )
    await deleteItemFromStorageService.execute(user_id, id)

    return response.status(200).json({ message: 'deleted' })
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { id } = request.params
    const { name, brand, price, amount } = request.body

    const updateItemFromStorageService = container.resolve(
      UpdateItemFromStorageService,
    )
    const updatedItem = await updateItemFromStorageService.execute({
      name,
      brand,
      price,
      amount,
      user_id,
      id,
    })

    return response.status(200).json(StorageView.render(updatedItem))
  }
}

export default StorageController
