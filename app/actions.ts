'use server'
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
  const geoIpHeaders = await getGeoIp(headers, logger)
  logger.info('Incrementing view count')
  const session = await getServerSession()
  await db()
    .insert(tbs.views)
    .values({ route, email: session?.user?.email ?? null, ...(geoIpHeaders ?? {}) })
  logger.info('Incremented view count')
}

export async function saveGuestbookEntry(formData: FormData) {
  const correlationId = getCorrelationId(nextHeaders())
  const logger = getLogger().child({ correlationId })
  logger.info('Saving guestbook entry')
  const session = await getServerSession()
  const email = session?.user?.email
  const comment = formData.get('entry')?.toString()
  if (!email || !comment) {
    logger.warn('Missing email or comment')
    return
  }
  await db().insert(tbs.comments).values({ email, comment })
  logger.info('Saved guestbook entry')
  revalidatePath('/guestbook')
}
