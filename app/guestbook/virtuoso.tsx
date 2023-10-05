'use client'

import type { DBQueryType } from 'app/actions'
import { PopIn } from 'app/components/Animations'
import { Virtuoso } from 'react-virtuoso'
import { useEntries } from './submitProvider'

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
export const Scroller = ({ queryCallback }: { queryCallback: DBQueryType }) => {
  const { entries, updateEntries } = useEntries()
  const entriesWithBetterNames = entries.map((entry) => {
    let firstName = null
    if (entry.name) {
      const nameParts = entry.name.split(' ')

      const filteredNameParts = nameParts.filter((part) => part.trim() !== '')
      if (filteredNameParts.length > 2) {
        firstName = filteredNameParts[0] + ' ' + filteredNameParts[1]
      } else {
        firstName = filteredNameParts[0]
      }
    }

    return {
      ...entry,
      name: firstName || entry.email,
    }
  })
  return (
    <div>
      <Virtuoso
        className="scrollbar-hide"
        style={{ height: 500, overflow: 'auto' }}
        data={entriesWithBetterNames}
        overscan={1}
        tabIndex={undefined}
        endReached={async () => {
          const beginning = entries[entries.length - 1].id - 1
          const end = beginning - 10
          await sleep(1000)
          const dataToAppend = await queryCallback({
            range: {
              beginning: beginning,
              end: end,
            },
          })
          updateEntries([...entries, ...dataToAppend])
        }}
        itemContent={(i, entry) => {
          return (
            <PopIn>
              <div key={`${entry.id}`} className="flex flex-col space-y-1 mb-4">
                <div className="w-full text-sm break-words">
                  <span className="text-neutral-600 dark:text-neutral-400 mr-1">{entry.name || entry.email}:</span>
                  {entry.comment
                    ? entry.comment.length > 500
                      ? entry.comment.slice(0, 500) + '...'
                      : entry.comment
                    : ''}
                </div>
              </div>
            </PopIn>
          )
        }}
      ></Virtuoso>
    </div>
  )
}
