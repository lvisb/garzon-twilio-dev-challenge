import { Inject, Injectable } from '@nestjs/common'
import { Db } from './db.provider.js'
import { DataSource } from 'typeorm'
import { User } from './entities/user.entity.js'

@Injectable()
export class DbService {
  constructor(@Inject(Db) private readonly _db: DataSource) {}

  get db(): DataSource {
    return this._db
  }

  get userRepo() {
    return this.db.getRepository(User)
  }
}
