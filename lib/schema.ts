import { AdapterAccount } from '@auth/core/adapters'
import {
  bigint,
  bigserial,
  boolean,
  index,
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
    is_subscribed: boolean('is_subscribed').notNull().default(true),
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
    expires_at: bigint('expires_at', { mode: 'number' }),
    refresh_token_expires_in: bigint('refresh_token_expires_in', { mode: 'number' }),
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

export const views = schema.table(
  'views',
  {
    id: bigserial('id', { mode: 'bigint' }).notNull().primaryKey(),
    email: text('email'),
    route: varchar('route'),
    geo_ip_country: varchar('geo_ip_country'),
    geo_ip_region: varchar('geo_ip_region'),
    geo_ip_city: varchar('geo_ip_city'),
    geo_ip_latitude: varchar('geo_ip_latitude'),
    geo_ip_longitude: varchar('geo_ip_longitude'),
    view_date: timestamp('view_date').notNull().defaultNow(),
  },
  (views) => {
    return {
      id_idx: index('id_idx').on(views.id),
      email_idx: index('email_idx').on(views.email),
      route_idx: index('route_idx').on(views.route),
      view_date_idx: index('view_date_idx').on(views.view_date).desc(),
      geo_ip_country_idx: index('geo_ip_country_idx').on(views.geo_ip_country),
      geo_ip_region_idx: index('geo_ip_region_idx').on(views.geo_ip_region),
      geo_ip_city_idx: index('geo_ip_city_idx').on(views.geo_ip_city),
      geo_ip_latitude_idx: index('geo_ip_latitude_idx').on(views.geo_ip_latitude),
      geo_ip_longitude_idx: index('geo_ip_longitude_idx').on(views.geo_ip_longitude),
    }
  },
)

export const guestbook_entries = schema.table(
  'guestbook_entries',
  {
    id: bigserial('id', { mode: 'bigint' }).notNull().primaryKey(),
    email: text('email'),
    comment: varchar('comment', {
      length: 2000,
    }).notNull(),
    comment_date: timestamp('comment_date', { mode: 'date' }).notNull().defaultNow(),
  },
  (route) => {
    return {
      id_idx: index('id_idx').on(route.id),
      email_idx: index('email_idx').on(route.email),
      comment_date_idx: index('comment_date_idx').on(route.comment_date).desc(),
    }
  },
)

export const tbs = {
  auth_users,
  accounts,
  sessions,
  verificationTokens,
  views,
  guestbook_entries,
}
