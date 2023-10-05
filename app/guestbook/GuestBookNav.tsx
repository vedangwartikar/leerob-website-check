'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'

export const GuestbookNav = ({ searchParams }: { searchParams: { stats?: string } }) => {
  const router = useRouter()
  return (
    <div className={'flex flex-row space-x-2'}>
      <div
        className={clsx(
          '-mt-10 mb-10 transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle text-lg underline',
          {
            'text-neutral-500 no-underline ': searchParams?.stats,
          },
        )}
        onClick={() => {
          router.push('/guestbook')
        }}
      >
        comments
      </div>

      <div
        className={clsx(
          '-mt-10 mb-10 transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle text-lg underline',
          {
            'text-neutral-500 no-underline': !searchParams?.stats,
          },
        )}
        onClick={() => {
          router.push('/guestbook?stats=true')
        }}
      >
        visitors
      </div>
    </div>
  )
}
