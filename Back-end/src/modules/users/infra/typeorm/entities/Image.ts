import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import User from '@modules/users/infra/typeorm/entities/User'

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  path: string

  @ManyToOne(() => User, User => User.images)
  @JoinColumn({ name: 'user_id' })
  user: User
}
