'use server'
import { between, desc } from 'drizzle-orm'
import { getAuthOptions } from 'lib/auth'
import { db } from 'lib/db'
import { getGeoIp } from 'lib/geo'
import { getCorrelationId, getLogger } from 'lib/logger'
import { tbs } from 'lib/schema'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { headers as nextHeaders } from 'next/headers'

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
  const entry = await db().insert(tbs.guestbook_entries).values({ email, comment }).returning()
  logger.info('Saved guestbook entry')
  revalidatePath('/guestbook')
  return entry
}

export const dbQuery = async ({ range, limit }: { range?: { beginning: number; end: number }; limit?: number }) => {
  const baseQuery = db().select().from(tbs.guestbook_entries).orderBy(desc(tbs.guestbook_entries.comment_date))
  if (range) {
    baseQuery.where(between(tbs.guestbook_entries.id, range.end, range.beginning))
  }
  if (limit) {
    baseQuery.limit(limit)
  }
  return baseQuery
}

export type DBQueryType = typeof dbQuery
