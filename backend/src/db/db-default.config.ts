import { DataSource } from 'typeorm'

import {
  dataSourceOptions,
  postMigrations,
  preMigrations,
} from '#db/db.config.js'

export default new DataSource({
  ...dataSourceOptions(),
  migrations: [...preMigrations, ...postMigrations],
})
