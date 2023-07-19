'use client'
import { motion } from 'framer-motion'
import { wrap } from 'popmotion'
import { ReactNode, useEffect, useState } from 'react'

export function Carousel({ images }: { images: ReactNode[] }) {
  const delays = [3000, 4000, 5000, 6000, 7000]
  const delay = delays[Math.floor(Math.random() * delays.length)]
  const [page, setPage] = useState(0)
  const [hasDelayed, setHasDelayed] = useState(false)

  const imageIndex = wrap(0, images.length, page)

  const paginate = (newDirection: number) => {
    setPage(page + newDirection)
  }
  useEffect(() => {
    const interval = setInterval(
      () => {
        paginate(1)
      },
      hasDelayed ? 4000 : delay,
    )
    setHasDelayed(true)
    return () => clearInterval(interval)
  }, [imageIndex])

  return (
    <>
      <motion.div
        key={page}
        transition={{ ease: 'easeOut', duration: 1.0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {images[imageIndex]}
      </motion.div>
    </>
  )
}
