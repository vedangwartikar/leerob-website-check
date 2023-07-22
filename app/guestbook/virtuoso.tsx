'use client'

import { PopIn } from 'app/components/Animations'
import { useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { inspect } from 'util'
import type { DBQueryType } from './page'

type Entries = {
  id: number
  email: string | null
  comment: string
  comment_date: Date
}[]
export const Scroller = ({ entries, queryCallback }: { entries: Entries; queryCallback: DBQueryType }) => {
  const [data, setData] = useState(entries)
  // console.log('\x1b[36m%s\x1b[0m', inspect(data, true, null, true))
  return (
    <Virtuoso
      // style={{ height: window.innerHeight > 780 ? 480 : 370, width: 340 }}
      className="scrollbar-hide"
      data={entries}
      style={{ height: 200, width: 340 }}
      endReached={async () => {
        const beginning = entries[entries.length - 1].id - 1
        const end = beginning - 3
        console.log('\x1b[36m%s\x1b[0m', beginning, end)
        const test = await queryCallback({
          range: {
            beginning: beginning,
            end: end,
          },
        })
        console.log('\x1b[36m%s\x1b[0m', inspect(test, true, null, true))
        setData([...data, ...test])
      }}
      itemContent={(i, entry) => {
        return (
          <PopIn>
            <div key={`${entry.id}`} className="flex flex-col space-y-1 mb-4">
              <div className="w-full text-sm break-words">
                <span className="text-neutral-600 dark:text-neutral-400 mr-1">{entry.email}:</span>
                {entry.comment}
              </div>
            </div>
          </PopIn>
        )
      }}
    ></Virtuoso>
  )
}
