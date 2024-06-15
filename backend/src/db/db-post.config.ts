import { DataSource } from 'typeorm'

import { dataSourceOptions, postMigrations } from '#db/db.config.js'

export default new DataSource({
  ...dataSourceOptions(),
  migrations: postMigrations,
})
