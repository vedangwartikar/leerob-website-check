'use client'
import clsx from 'clsx'
import { LayoutGroup, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = {
  '/': {
    name: 'home',
  },
  '/blog': {
    name: 'blog',
  },
  '/guestbook': {
    name: 'guestbook',
  },
}

export default function Navbar({ theme }: { theme: string }) {
  let pathname = usePathname() || '/'
  if (pathname.includes('/blog/')) {
    pathname = '/blog'
  }
  const ThemeSelector = dynamic(() => import('./ThemeSelector'), {
    ssr: false,
  })
  return (
    <>
      <aside className="-ml-[8px] mb-16 tracking-tight">
        <div className="lg:sticky lg:top-20">
          <LayoutGroup>
            <nav className="flex justify-end relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative" id="nav">
              <div className="flex flex-row space-x-0 pr-10">
                {Object.entries(navItems).map(([path, { name }]) => {
                  const isActive = path === pathname
                  return (
                    <Link
                      key={path}
                      href={path}
                      className={clsx(
                        'transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle',
                        {
                          'text-neutral-500': !isActive,
                        },
                      )}
                    >
                      <span className="relative py-1 px-2">
                        {name}
                        {path === pathname ? (
                          <motion.div
                            className="absolute h-[1px] top-7 mx-2 inset-0 bg-neutral-200 dark:bg-neutral-800 z-[-1] dark:bg-gradient-to-r from-transparent to-neutral-900"
                            layoutId="sidebar"
                            transition={{
                              type: 'spring',
                              stiffness: 350,
                              damping: 30,
                            }}
                          />
                        ) : null}
                      </span>
                    </Link>
                  )
                })}
              </div>
              <div className="w-full"></div>
              <div className="">
                <div>
                  <ThemeSelector theme={theme === 'dark' ? 'dark' : 'light'} />
                </div>
              </div>
            </nav>
          </LayoutGroup>
        </div>
      </aside>
    </>
  )
}
