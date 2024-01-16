/* eslint-disable @next/next/no-img-element */
import { HoverPop } from 'app/components/Animations'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import ActivityStreakLogo from 'public/images/main-page/activitystreaklogo.svg'
import GithubLogoWhite from 'public/images/main-page/github-mark-white.svg'
import GithubLogo from 'public/images/main-page/github-mark.svg'
import XealthLogo from 'public/images/main-page/logo-xealth.jpg'
export default async function Page() {
  const theme = cookies().get('x-theme')
  return (
    <>
      <section className="-mt-8">
        <div className="prose prose-neutral dark:prose-invert">
          <h2>My Open Source Stuff</h2>
          <p>I&quot;m passionate about source.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
          <HoverPop scale={1.08}>
            <Link target="_blank" href={'https://github.com/michaelangeloio/does-it-throw'}>
              <div className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-4 flex flex-col items-center">
                <img
                  key={'does-it-throw'}
                  src={'https://raw.githubusercontent.com/michaelangeloio/does-it-throw/main/assets/icon-small.png'}
                  alt={'Does it Throw?'}
                  className="w-28 h-28 mb-4"
                />
                <h3 className="text-lg font-semibold">{'Does it Throw?'}</h3>
                <p className="text-sm text-center">
                  {
                    'An LSP and VSCode extension for identifying uncaught JavaScript code, built with Rust, WASM, and the SWC parser.'
                  }
                </p>
              </div>
            </Link>
          </HoverPop>
          <HoverPop scale={1.08}>
            <Link target="_blank" href={'https://ts-rest.com'}>
              <div className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-4 flex flex-col items-center ">
                <svg width="110" height="120" viewBox="0 0 116 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_13_20)">
                    <rect width="116" height="116" rx="26" fill="#9333EA" />
                    <path
                      d="M62.487 59.9566L95.1166 60.1262L95.1493 53.8212L62.5198 53.6517L62.487 59.9566ZM62.5863 40.8469L95.2159 41.0164L95.2493 34.5815L62.6197 34.412L62.5863 40.8469ZM62.4168 73.4765L95.0463 73.646L95.0129 80.0809L62.3833 79.9114L62.4168 73.4765Z"
                      fill="white"
                    />
                    <path
                      d="M46.06 64.92C52.3 62.58 55.875 57.51 55.875 50.555C55.875 40.545 48.595 34.5 36.7 34.5H18.5V40.935H36.44C44.305 40.935 48.4 44.445 48.4 50.555C48.4 56.6 44.305 60.175 36.44 60.175H18.5V80H25.91V66.48H36.7C37.48 66.48 38.325 66.48 39.04 66.415L48.595 80H56.655L46.06 64.92Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_13_20">
                      <rect width="116" height="115" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <h3 className="text-lg font-semibold mt-2">{'TS-Rest'}</h3>
                <p className="text-sm text-center">
                  {
                    'Core Team member at a popular Typescript framework for connecting legacy applications in a type-safe manner.'
                  }
                </p>
              </div>
            </Link>
          </HoverPop>
          <HoverPop scale={1.08}>
            <Link href={'https://github.com/michaelangeloio/ts-sse'}>
              <div className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-4 flex flex-col items-center">
                {theme?.value === 'dark' ? <GithubLogoWhite /> : <GithubLogo />}
                <h3 className="text-lg font-semibold mt-3">{'ts-sse'}</h3>
                <p className="text-sm text-center">
                  {'A utility library enabling easy Server-Sent Events for Bun and Node.js-based applications.'}
                </p>
              </div>
            </Link>
          </HoverPop>
          <HoverPop scale={1.08}>
            <Link href={'https://github.com/Xealth/cherry-pick-action'}>
              <div className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-4 flex flex-col items-center">
                <Image
                  key={'xealth-cherry-pick-action'}
                  src={XealthLogo}
                  alt={'xealth-cherry-pick-action'}
                  className="w-28 h-28 mb-4"
                />
                <h3 className="text-lg font-semibold">{'Xealth Cherry-Pick-Action'}</h3>
                <p className="text-sm text-center">
                  {'A GitHub automation action enabling cherry picks via Pull Request Labels.'}
                </p>
              </div>
            </Link>
          </HoverPop>
          <HoverPop scale={1.08}>
            <Link target="_blank" href={'https://activitystreak.app'}>
              <div className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-4 flex flex-col items-center">
                <ActivityStreakLogo className="w-22 h-28" alt="Site Title" />
                <h3 className="text-lg font-semibold">{'ActivityStreak'}</h3>
                <p className="text-sm text-center">
                  {'An App for automatically calculating and tracking your Run Streak.'}
                </p>
              </div>
            </Link>
          </HoverPop>
        </div>
      </section>
    </>
  )
}
