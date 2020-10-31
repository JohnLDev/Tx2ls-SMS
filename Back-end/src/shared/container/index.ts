import { container } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository'

import ISubUserRepository from '@modules/subusers/repositories/ISubUserRepository'
import SubUserRepository from '@modules/subusers/infra/typeorm/repositories/SubUserRepository'

import IStorageRepository from '@modules/store/repositories/IStorageRepository'
import StorageRepository from '@modules/store/infra/typeorm/repositories/StorageRepository'

import ISaleRepository from '@modules/store/repositories/ISaleRepository'
import SaleRepository from '@modules/store/infra/typeorm/repositories/SaleRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<ISubUserRepository>(
  'SubUserRepository',
  SubUserRepository,
)
container.registerSingleton<IStorageRepository>(
  'StorageRepository',
  StorageRepository,
)

container.registerSingleton<ISaleRepository>('SaleRepository', SaleRepository)
