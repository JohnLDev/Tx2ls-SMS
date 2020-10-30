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

@Entity('storage')
class Storage {
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

  @Column()
  barcode: string

  @Column()
  user_id: string

  @ManyToMany(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
export default Storage
