import { container } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository'

import ISubUserRepository from '@modules/subusers/repositories/ISubUserRepository'
import SubUserRepository from '@modules/subusers/infra/typeorm/repositories/SubUserRepository'

import IStorageRepository from '@modules/store/repositories/IStorageRepository'
import StorageRepository from '@modules/store/infra/typeorm/repositories/StorageRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<ISubUserRepository>(
  'SubUserRepository',
  SubUserRepository,
)
container.registerSingleton<IStorageRepository>(
  'StorageRepository',
  StorageRepository,
)
