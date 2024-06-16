import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export interface IUser {
  userId: string
  grantId: string
  name: string
  email: string
  provider: string
  isActive: boolean
  birthDate?: Date
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

export interface UserSettings {
  horoscope: boolean
  weather: boolean
  latitude: number
  longitude: number
  motivationalQuotes: boolean
}

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  userId: string

  @Index()
  @Column({ type: 'uuid' })
  grantId: string

  @Column({ type: 'varchar', length: 100, default: '' })
  name: string

  @Index()
  @Column({ type: 'varchar', length: 255 })
  email: string

  @Index()
  @Column({ type: 'varchar', length: 20 })
  provider: string

  @Column({
    type: 'jsonb',
    default: {
      horoscope: false,
      weather: false,
      latitude: 0,
      longitude: 0,
      motivationalQuotes: false,
    } as UserSettings,
  })
  settings: UserSettings

  @Index()
  @Column({ type: 'boolean', default: true })
  isActive: boolean

  @Index()
  @Column({ type: 'date', nullable: true })
  birthDate: Date

  @Index()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date

  @Index()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date

  @Index()
  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deletedAt: Date
}
