import { FadeLeft, PopIn } from 'app/components/Animations'
import { GitHubIcon } from 'app/components/icons'
import { between, desc } from 'drizzle-orm'
import { getAuthOptions } from 'lib/auth'
import { db } from 'lib/db'
import { getCorrelationId, getLogger } from 'lib/logger'
import { tbs } from 'lib/schema'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { headers as nextHeaders } from 'next/headers'
import { inspect } from 'util'
import { SignIn, SignOut } from './buttons'
import Form from './form'
import { Scroller } from './virtuoso'
// async function getGuestbook() {
//   const data = await queryBuilder
//     .selectFrom('guestbook')
//     .select(['id', 'body', 'created_by', 'updated_at'])
//     .orderBy('updated_at', 'desc')
//     .limit(100)
//     .execute()

//   return data
// }
declare global {
  interface BigInt {
    toJSON(): string
  }
}

BigInt.prototype.toJSON = function (): string {
  return this.toString()
}

const dbQuery = async ({ range, limit }: { range?: { beginning: number; end: number }; limit?: number }) => {
  'use server'
  const baseQuery = db().select().from(tbs.guestbook_entries)
  if (range) {
    console.log('\x1b[36m%s\x1b[0m', 'adding range', range)
    console.log('\x1b[36m%s\x1b[0m', BigInt(range.beginning), BigInt(range.end))
    baseQuery.where(between(tbs.guestbook_entries.id, range.beginning, range.end))
  }
  if (limit) {
    baseQuery.limit(limit).orderBy(desc(tbs.guestbook_entries.comment_date))
  }
  return baseQuery
}

export type DBQueryType = typeof dbQuery

export const metadata: Metadata = {
  title: 'Guestbook',
  description: 'Sign my guestbook and leave your mark.',
}

export const dynamic = 'force-dynamic'

export default async function GuestbookPage() {
  const correlationId = getCorrelationId(nextHeaders())
  const logger = getLogger().child({ correlationId })
  const session = await getServerSession(getAuthOptions(logger))
  const entries = await dbQuery({
    range: {
      beginning: 24,
      end: 17,
    },
  })
  console.log('\x1b[36m%s\x1b[0m', inspect(entries, true, null, true))

  // let entries
  // let session

  // try {
  //   const [guestbookRes, sessionRes] = await Promise.allSettled([getGuestbook(), auth()])

  //   if (guestbookRes.status === 'fulfilled' && guestbookRes.value[0]) {
  //     entries = guestbookRes.value
  //   } else {
  //     console.error(guestbookRes)
  //   }

  //   if (sessionRes.status === 'fulfilled') {
  //     session = sessionRes.value
  //   } else {
  //     console.error(sessionRes)
  //   }
  // } catch (error) {
  //   console.error(error)
  // }

  return (
    <section>
      <FadeLeft delay={0.3}>
        <h1 className="font-bold text-2xl mb-4 tracking-tighter">say hi</h1>
      </FadeLeft>
      {session?.user ? (
        <>
          <Form />
          <PopIn>
            <SignOut />
          </PopIn>
        </>
      ) : (
        <PopIn>
          <SignIn>
            <GitHubIcon />
          </SignIn>
        </PopIn>
      )}
      <Scroller entries={entries} queryCallback={dbQuery}></Scroller>
      {/* 
      {entries.map((entry) => (
        <div key={`${entry.id}`} className="flex flex-col space-y-1 mb-4">
          <div className="w-full text-sm break-words">
            <span className="text-neutral-600 dark:text-neutral-400 mr-1">{entry.email}:</span>
            {entry.comment}
          </div>
        </div>
      ))} */}
    </section>
  )
}
