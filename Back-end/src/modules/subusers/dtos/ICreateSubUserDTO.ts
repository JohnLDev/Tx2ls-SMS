export default interface ICreateSubUserDTO {
  name: string
  email: string
  password: string
  user_id: string
  isAdm?: boolean
}
