import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateSaleService from '@modules/store/services/CreateSaleService'

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
    return response.status(200).json(sale)
  }
}
