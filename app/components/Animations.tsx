'use client'

import { motion } from 'framer-motion'
export function PopIn(props: { children: React.ReactNode; delay?: number; divKey?: any }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay: props.delay || 0.5,
        type: 'spring',
      }}
      key={props.divKey || undefined}
    >
      {props.children}
    </motion.div>
  )
}

export function HoverPop(props: { children: React.ReactNode; scale?: number }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.2,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.8,
      }}
    >
      {props.children}
    </motion.div>
  )
}

export function FadeIn(props: { children: React.ReactNode; delay?: number; divKey?: any }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: props.delay || 0.5,
      }}
      key={props.divKey || undefined}
    >
      {props.children}
    </motion.div>
  )
}

export function FadeUp(props: { children: React.ReactNode; delay?: number; divKey?: any }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: props.delay || 0.5,
      }}
      key={props.divKey || undefined}
    >
      {props.children}
    </motion.div>
  )
}

export function FadeLeft(props: { children: React.ReactNode; delay?: number; divKey?: any }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: props.delay || 0.5,
      }}
      key={props.divKey || undefined}
    >
      {props.children}
    </motion.div>
  )
}
