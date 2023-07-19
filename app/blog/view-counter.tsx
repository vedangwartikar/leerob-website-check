'use client'

import { increment } from 'app/actions'
import { getViewsForSlug } from 'lib/utils'
import { useEffect } from 'react'

export default function ViewCounter({
  slug,
  allViews,
  trackView,
}: {
  slug: string
  allViews: {
    slug: string
    count: number
  }[]
  trackView?: boolean
}) {
  const number = getViewsForSlug(allViews, slug)

  useEffect(() => {
    if (trackView) {
      increment(slug)
    }
  }, [])

  return <p className="text-neutral-600 dark:text-neutral-400">{`${number.toLocaleString()} views`}</p>
}
