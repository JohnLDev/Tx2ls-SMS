export default interface IUpdateUserDTO {
  id: string
  name?: string
  password?: string
  enterprise_Name?: string
  whatsapp?: number
  requestImages?: Express.Multer.File[]
}
