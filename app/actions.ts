'use server'
import { between, desc, eq } from 'drizzle-orm'
import { getAuthOptions } from 'lib/auth'
import { db } from 'lib/db'
import { getGeoIp } from 'lib/geo'
import { getCorrelationId, getLogger } from 'lib/logger'
import { tbs } from 'lib/schema'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { headers as nextHeaders } from 'next/headers'
import type { Entry } from './guestbook/submitProvider'

export async function increment(route: string) {
  const headers = nextHeaders()
  const correlationId = getCorrelationId(headers)
  const logger = getLogger().child({ correlationId })
  logger.info('Incrementing view count')
  const [session, geoIpHeaders] = await Promise.all([
    getServerSession(getAuthOptions(logger)),
    getGeoIp(headers.get('fly-client-ip'), logger),
  ])
  await db()
    .insert(tbs.views)
    .values({ route, email: session?.user?.email ?? null, ...(geoIpHeaders ?? {}) })
  logger.info('Incremented view count')
}

export async function saveGuestbookEntry(formData: FormData) {
  const correlationId = getCorrelationId(nextHeaders())
  const logger = getLogger().child({ correlationId })
  logger.info('Saving guestbook entry')
  const session = await getServerSession(getAuthOptions(logger))
  const email = session?.user?.email
  const comment = formData.get('entry')?.toString()
  if (!email || !comment) {
    logger.warn('Missing email or comment')
    return
  }
  const entry = await db().transaction(async (trx) => {
    const insert = await db().insert(tbs.guestbook_entries).values({ email, comment }).returning()
    const { id } = insert[0]
    const row = await trx
      .select()
      .from(tbs.guestbook_entries)
      .where(eq(tbs.guestbook_entries.id, id))
      .leftJoin(tbs.auth_users, eq(tbs.guestbook_entries.email, tbs.auth_users.email))
    return {
      email,
      comment,
      id,
      comment_date: row[0].guestbook_entries.comment_date,
      name: row[0].auth_users?.name,
    }
  })

  logger.info('Saved guestbook entry')
  revalidatePath('/guestbook')
  return entry
}

export const dbQuery = async ({
  range,
  limit,
}: {
  range?: { beginning: number; end: number }
  limit?: number
}): Promise<Entry[]> => {
  const baseQuery = db()
    .select()
    .from(tbs.guestbook_entries)
    .leftJoin(tbs.auth_users, eq(tbs.guestbook_entries.email, tbs.auth_users.email))
    .orderBy(desc(tbs.guestbook_entries.comment_date))
  if (range) {
    baseQuery.where(between(tbs.guestbook_entries.id, range.end, range.beginning))
  }
  if (limit) {
    baseQuery.limit(limit)
  }
  const result = await baseQuery
  const aggregation = result.map((entry) => {
    const { email, comment_date, comment, id } = entry.guestbook_entries
    if (entry.auth_users) {
      const { name } = entry.auth_users
      return { email, comment_date, comment, name, id }
    }
    return { email, comment_date, comment, id }
  })
  return aggregation
}

export type DBQueryType = typeof dbQuery
