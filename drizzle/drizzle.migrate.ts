import { program } from 'commander'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { getEnv } from 'lib/env'
import { resolve } from 'path'
import postgres from 'postgres'
program.name('drizzle migrate')
program.requiredOption('--stage <char>', 'local, production')
program.parse()
const opts = program.opts()

config({ path: resolve(__dirname, `../.env.${opts.stage}`) })

const env = getEnv()

const sql = postgres(env.DATABASE_URL, { max: 1, user: env.DATABASE_USERNAME, password: env.DATABASE_PASSWORD })
const db = drizzle(sql)

async function migration() {
  await migrate(db, { migrationsFolder: resolve(__dirname, 'sql') })
  return
}

migration()
