import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IsEmail } from 'class-validator'

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  name: string

  @IsEmail()
  @Column()
  email: string

  @Column()
  password: string

  @Column({ default: false })
  is_Verify: boolean

  @Column({ generated: 'uuid' })
  verify_Key: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
export default User
