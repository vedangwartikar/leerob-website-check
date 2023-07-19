import { PostgresJsDatabase, drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { getEnv } from './env'
import { tbs as dbSchema } from './schema'

type DbClient = PostgresJsDatabase<typeof dbSchema>

// eslint-disable-next-line no-var
var globaldb: DbClient

const dbEnv = getEnv()

const db = () => {
  if (!globaldb) {
    globaldb = drizzle(
      postgres(dbEnv.DATABASE_URL, {
        user: dbEnv.DATABASE_USERNAME,
        password: dbEnv.DATABASE_PASSWORD,
      }),
      { schema: dbSchema },
    )
  }
  return globaldb
}

export { db, dbSchema }
export type { DbClient }
