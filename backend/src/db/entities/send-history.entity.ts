import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './user.entity.js'

export enum SendHistoryStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
}

@Entity({ name: 'send_history' })
export class SendHistory {
  @PrimaryGeneratedColumn('uuid')
  historyId: string

  @Index()
  @Column({ name: 'user_id', type: 'uuid' })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Relation<User>

  @Index()
  @Column({ type: 'varchar', length: 20, default: '' })
  status: string

  @Column()
  @Column({ type: 'text', nullable: true })
  log?: string

  @Index()
  @Column({ type: 'varchar', length: 50, nullable: true })
  timezone: string

  @Column({ type: 'int', nullable: true })
  ellapsedTime: number

  @Index()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date

  @Index()
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date

  @Index()
  @CreateDateColumn({ type: 'timestamp with time zone' })
  completedAt: Date
}
