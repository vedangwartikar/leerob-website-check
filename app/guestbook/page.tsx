import { dbQuery } from 'app/actions'
import { FadeLeft, PopIn } from 'app/components/Animations'
import { GitHubIcon } from 'app/components/icons'
import { getAuthOptions } from 'lib/auth'
import { getCorrelationId, getLogger } from 'lib/logger'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { headers as nextHeaders } from 'next/headers'
import { SignIn, SignOut } from './buttons'
import Form from './form'
import { EntriesProvider } from './submitProvider'
import { Scroller } from './virtuoso'
export const metadata: Metadata = {
  title: 'Guestbook',
  description: 'Sign my guestbook and leave your mark.',
}

export const dynamic = 'force-dynamic'

export default async function GuestbookPage() {
  const correlationId = getCorrelationId(nextHeaders())
  const logger = getLogger().child({ correlationId })
  const [session, entries] = await Promise.all([
    getServerSession(getAuthOptions(logger)),
    await dbQuery({
      limit: 20,
    }),
  ])

  return (
    <section>
      <EntriesProvider initialEntries={entries}>
        <FadeLeft delay={0.3}>
          <h1 className="font-bold text-2xl mb-4 -mt-5 tracking-tighter">say hi</h1>
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
        <Scroller queryCallback={dbQuery}></Scroller>
      </EntriesProvider>
    </section>
  )
}
