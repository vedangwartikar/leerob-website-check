import { eq, sql } from 'drizzle-orm'
import { db } from 'lib/db'
import { getCorrelationId, getLogger } from 'lib/logger'
import { tbs } from 'lib/schema'
import { headers as nextHeaders } from 'next/headers'
import { cache } from 'react'

// export const getBlogViews = cache(async () => {
//   if (!process.env.DATABASE_URL) {
//     return 0;
//   }

//   const data = await queryBuilder
//     .selectFrom('views')
//     .select(['count'])
//     .execute();

//   return data.reduce((acc, curr) => acc + Number(curr.count), 0);
// });

export const getViewsForRoute = cache(async (route: string) => {
  const correlationId = getCorrelationId(nextHeaders())
  const logger = getLogger().child({ correlationId })
  logger.info({ route }, 'getting view count')
  const count = await db()
    .select({ count: sql<number>`count(*)` })
    .from(tbs.views)
    .where(eq(tbs.views.route, route))
  logger.info({ route }, 'fetched view count')
  return count[0].count
})
