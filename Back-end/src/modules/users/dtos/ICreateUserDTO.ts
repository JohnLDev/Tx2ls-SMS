export default interface ICreateUserDTO {
  name: string
  email: string
  password: string
  enterprise_Name: string
  whatsapp: number
  images: Array<{
    path: string
  }>
}
