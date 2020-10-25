import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinColumn,
} from 'typeorm'

import User from '@modules/users/infra/typeorm/entities/User'
import SubUser from '@modules/users/infra/typeorm/entities/SubUser'

@Entity('sales')
class Sale {
  @PrimaryGeneratedColumn('increment')
  id: string

  @Column()
  name: string

  @Column()
  brand: string

  @Column()
  price: number

  @Column()
  amount: number

  @ManyToMany(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @ManyToMany(() => SubUser, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'subUser_id' })
  sub_User: SubUser

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
export default Sale
