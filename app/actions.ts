'use server'
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
  const geoIpHeaders = await getGeoIp(headers.get('fly-client-ip'), logger)
  logger.info('Incrementing view count')
  const session = await getServerSession(getAuthOptions(logger))
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
  await db().insert(tbs.guestbook_entries).values({ email, comment })
  logger.info('Saved guestbook entry')
  revalidatePath('/guestbook')
}
