import type { Config } from 'drizzle-kit'

export default {
  schema: 'lib/schema.ts',
  driver: 'pg',
  out: 'drizzle/sql',
} satisfies Config
