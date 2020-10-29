import { container } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository'

import ISubUserRepository from '@modules/subusers/repositories/ISubUserRepository'
import SubUserRepository from '@modules/subusers/infra/typeorm/repositories/SubUserRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<ISubUserRepository>(
  'SubUserRepository',
  SubUserRepository,
)
