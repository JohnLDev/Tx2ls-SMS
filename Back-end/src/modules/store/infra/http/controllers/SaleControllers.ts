import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateSaleService from '@modules/store/services/CreateSaleService'
import IndexSaleService from '@modules/store/services/IndexSaleService'
import RevertSaleService from '@modules/store/services/RevertSaleService'
import SaleView from '../../../views/SaleView'

export default class SaleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, brand, price, amount, barcode, id } = request.body
    const user_id = request.user.id
    const subUser_id = request.sub_User.id
    const createSaleService = container.resolve(CreateSaleService)
    const sale = await createSaleService.execute({
      user_id,
      subUser_id,
      name,
      brand,
      price,
      amount,
      barcode,
      id,
    })
    return response.status(200).json(SaleView.render(sale))
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { subUserName, untilDate, fromDate } = request.query
    const indexSaleService = container.resolve(IndexSaleService)
    const sale = await indexSaleService.execute({
      user_id,
      untilDate: (untilDate as unknown) as string,
      fromDate: (fromDate as unknown) as string,
      subUser_Name: (subUserName as unknown) as string,
    })
    return response.status(200).json(SaleView.renderMany(sale))
  }

  public async revert(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { id } = request.params
    const revertSaleService = container.resolve(RevertSaleService)
    await revertSaleService.execute({ id, user_id })

    return response.status(200).json({ message: 'sale successful reverted' })
  }
}
