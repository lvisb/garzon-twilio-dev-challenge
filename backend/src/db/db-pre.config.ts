import { DataSource } from 'typeorm'

import { dataSourceOptions, preMigrations } from '#db/db.config.js'

export default new DataSource({
  ...dataSourceOptions(),
  migrations: preMigrations,
})
