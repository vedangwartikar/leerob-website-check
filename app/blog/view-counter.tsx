'use client'

import { increment } from 'app/actions'
import { useEffect } from 'react'

export default function ViewCounter({
  route,
  count,
  trackView,
}: {
  route: string
  trackView?: boolean
  count: number
}) {
  // const number = getViewsForSlug(allViews, slug)

  useEffect(() => {
    if (trackView) {
      increment(route)
    }
  }, [])

  return <p className="text-neutral-600 dark:text-neutral-400">{`${count.toLocaleString()} views`}</p>
}
