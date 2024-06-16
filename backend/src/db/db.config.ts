import { DataSourceOptions, Table } from 'typeorm'
import { NamingStrategyInterface } from 'typeorm/browser'
import { snakeCase } from 'typeorm/util/StringUtils.js'
import { User } from './entities/user.entity.js'

export const entities = [User]

export const preMigrations: any[] = []

export const postMigrations: any[] = []

export const dataSourceOptions = (): DataSourceOptions => ({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities,
  synchronize: process.env.NODE_ENV === 'development',
  migrationsTableName: '_typeorm_migrations',
  migrations: [],
  subscribers: [],
  migrationsTransactionMode: 'each',
  logging: 'all',
  namingStrategy: {
    tableName(
      targetName: string,
      userSpecifiedName: string | undefined,
    ): string {
      return snakeCase(userSpecifiedName || targetName)
    },
    columnName(
      propertyName: string,
      customName: string | undefined,
      _: string[],
    ): string {
      return snakeCase(customName || propertyName)
    },
    indexName(tableOrName: string, columns: string[], _where?: string): string {
      return `idx_${tableOrName}_${columns.join('_')}`
    },
    primaryKeyName(tableOrName: Table | string, columnNames: string[]): string {
      let tableName: string

      if (typeof tableOrName === 'string') tableName = tableOrName

      if (tableOrName instanceof Table)
        tableName = tableOrName.name.replace(`${tableOrName.schema}.`, '')

      return `pk_${tableName}_${columnNames.join('_')}`
    },
    joinColumnName(_: string, referencedColumnName: string): string {
      return `${snakeCase(referencedColumnName)}`
    },
    foreignKeyName(
      tableOrName: string,
      columnNames: string[],
      _referencedTablePath?: string,
      _referencedColumnNames?: string[],
    ): string {
      return `fk_${tableOrName}_${columnNames.join('_')}`
    },
    relationName(propertyName: string): string {
      return snakeCase(propertyName)
    },
    relationConstraintName(
      tableOrName: Table | string,
      columnNames: string[],
      _where?: string,
    ) {
      let tableName: string

      if (typeof tableOrName === 'string') tableName = tableOrName

      if (tableOrName instanceof Table)
        tableName = tableOrName.name.replace(`${tableOrName.schema}.`, '')

      return `uniq_${tableName}_${columnNames.join('_')}`
    },
  } as NamingStrategyInterface,
})
