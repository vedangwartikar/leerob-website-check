import clsx from "clsx"
import Image from "next/image"
import Colorado from 'public/images/main-page/colorado.jpg'
import Hawaii1 from 'public/images/main-page/hawaii.jpg'
import Hawaii2 from 'public/images/main-page/hawaiii2.jpg'
import Brighton from 'public/images/main-page/brighton.jpg'
import Honolulu from 'public/images/main-page/honolulu.jpg'
import Malibu from 'public/images/main-page/malibu.jpg'

export function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (

    <div className="columns-2 sm:columns-3 gap-4 my-8">
    <div className="relative h-40 mb-4">
      <Image
        alt="Me speaking on stage at React Summit about the future of Next.js"
        src={Hawaii1}
        fill
        sizes="(max-width: 768px) 213px, 33vw"
        priority
        className="rounded-lg object-cover" />
    </div>
    <div className="relative h-80 mb-4 sm:mb-0">
      <Image
        alt="Me, Lydia, and Delba filming the Next.js Conf keynote"
        src={Hawaii2}
        fill
        sizes="(max-width: 768px) 213px, 33vw"
        priority
        className="rounded-lg object-cover object-[-16px] sm:object-center" />
    </div>
    <div className="relative h-40 sm:h-80 sm:mb-4">
      <Image
        alt="Me standing on stage at Reactathon delivering the keynote"
        src={Colorado}
        fill
        sizes="(max-width: 768px) 213px, 33vw"
        priority
        className="rounded-lg object-cover object-top sm:object-center" />
    </div>
    <div className="relative h-40 mb-4 sm:mb-0">
      <Image
        alt="Me standing on stage at SmashingConf giving a talk about my optimism for the web"
        src={Brighton}
        fill
        sizes="(max-width: 768px) 213px, 33vw"
        priority
        className="rounded-lg object-cover" />
    </div>
    <div className="relative h-40 mb-4">
      <Image
        alt="Me and Guillermo Rauch on stage for Vercel Ship, answering questions from the Next.js community"
        src={Malibu}
        fill
        sizes="(max-width: 768px) 213px, 33vw"
        priority
        className="rounded-lg object-cover" />
    </div>
    <div className="relative h-80">
      <Image
        alt="My badge on top of a pile of badges from a Vercel meetup we held"
        src={Honolulu}
        fill
        sizes="(min-width: 768px) 213px, 33vw"
        priority
        className="rounded-lg object-cover" />
    </div>
  </div>
  )
}