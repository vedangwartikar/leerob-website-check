'use client'
import { ReactNode, createContext, useContext, useState } from 'react'

type Entry = {
  id: number
  email: string | null
  comment: string
  comment_date: Date
}

type EntriesContextType = {
  entries: Entry[]
  updateEntries: (newEntries: Entry[]) => void
}

const EntriesContext = createContext<EntriesContextType | undefined>(undefined)

const EntriesProvider = ({ children, initialEntries }: { children: ReactNode; initialEntries: Entry[] }) => {
  const [entries, setEntries] = useState<Entry[]>(initialEntries || [])

  const updateEntries = (newEntries: Entry[]) => {
    setEntries(newEntries)
  }

  const entriesContextValue: EntriesContextType = {
    entries,
    updateEntries,
  }

  return <EntriesContext.Provider value={entriesContextValue}>{children}</EntriesContext.Provider>
}

const useEntries = () => {
  const context = useContext(EntriesContext)
  if (!context) {
    throw new Error('useEntries must be used within an EntriesProvider')
  }
  return context
}

export { EntriesProvider, useEntries }
