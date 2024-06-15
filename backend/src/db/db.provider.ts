import { DataSource } from 'typeorm'

import { dataSourceOptions } from './db.config.js'

import { EnvService } from '#env/env.service.js'

export const Db = 'DbProvider'

export const TypeORMProvider: any = {
  provide: Db,
  inject: [EnvService],
  useFactory: async (envService: EnvService): Promise<any> => {
    const dataSource = new DataSource({ ...dataSourceOptions() })

    return dataSource.initialize()
  },
}
