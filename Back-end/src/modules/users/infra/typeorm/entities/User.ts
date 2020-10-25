import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm'
import { IsEmail } from 'class-validator'
import Image from '@modules/users/infra/typeorm/entities/Image'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @IsEmail()
  @Column()
  email: string

  @Column()
  password: string

  @Column()
  enterprise_Name: string

  @Column()
  whatsapp: number

  @Column({ default: false })
  is_Verify: boolean

  @Column({ generated: 'uuid' })
  verify_Key: string

  @OneToMany(() => Image, image => image.user, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'user_id' })
  images: Image[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
export default User
