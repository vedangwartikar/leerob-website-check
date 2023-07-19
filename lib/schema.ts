import { AdapterAccount } from '@auth/core/adapters'
import {
  bigserial,
  index,
  integer,
  pgSchema,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

export const schema = pgSchema('michaelangeloio')

export const auth_users = schema.table(
  'auth_users',
  {
    id: uuid('id').notNull().defaultRandom().primaryKey(),
    name: text('name'),
    email: text('email').notNull(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
  },
  (table) => {
    return {
      id_idx: uniqueIndex('id_idx').on(table.id),
      email: index('email').on(table.email),
      emailVerified: index('emailVerified').on(table.emailVerified).desc(),
    }
  },
)

export const accounts = schema.table(
  'accounts',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => auth_users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userId_idx: index('userId_idx').on(account.userId),
    provider_idx: index('provider_idx').on(account.provider),
    providerAccountId_idx: index('providerAccountId_idx').on(account.providerAccountId),
    expires_at_idx: index('expires_at_idx').on(account.expires_at).desc(),
    type_idx: index('type_idx').on(account.type),
  }),
)

export const sessions = schema.table(
  'sessions',
  {
    sessionToken: text('sessionToken').notNull().primaryKey(),
    userId: uuid('userId')
      .notNull()
      .references(() => auth_users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (session) => ({
    userId_idx: index('userId_idx').on(session.userId),
    expires_idx: index('expires_idx').on(session.expires).desc(),
    sessionToken_idx: index('sessionToken_idx').on(session.sessionToken),
  }),
)

export const verificationTokens = schema.table(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
    expires_idx: index('expires_idx').on(vt.expires).desc(),
    token_idx: index('token_idx').on(vt.token),
    identifier_idx: index('identifier_idx').on(vt.identifier),
  }),
)

export const views = schema.table('views', {
  id: bigserial('id', { mode: 'bigint' }).notNull().primaryKey(),
  name: varchar('name').notNull(),
  query: text('query').notNull(),
  description: text('description'),
})

export const comments = schema.table('comments', {
  id: bigserial('id', { mode: 'bigint' }).notNull().primaryKey(),
  comment: varchar('comment', {
    length: 2000,
  }).notNull(),
  comment_date: timestamp('comment_date', { mode: 'date' }).notNull().defaultNow(),
})

export const auth_tbs = {
  auth_users,
  accounts,
  sessions,
  verificationTokens,
}
