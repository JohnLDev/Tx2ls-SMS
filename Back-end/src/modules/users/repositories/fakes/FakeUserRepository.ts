import User from '@modules/users/infra/typeorm/entities/User'

class UserRepository {
  private users: User[] = []
}

export default UserRepository
