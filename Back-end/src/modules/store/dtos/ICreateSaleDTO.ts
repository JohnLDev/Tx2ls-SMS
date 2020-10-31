export default interface ICreateSaleDTO {
  user_id: string
  subUser_id: string
  name: string
  brand: string
  price: number
  amount: number
  barcode?: string
  id?: string
}
