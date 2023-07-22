import Image from 'next/image'

import brighton from 'public/images/main-page/brighton.jpg'
import closeup from 'public/images/main-page/closeup.jpg'
import colorado from 'public/images/main-page/colorado.jpg'
import doggos from 'public/images/main-page/doggos.jpg'
import girlfrield from 'public/images/main-page/girlfriend.jpg'
import hawaii from 'public/images/main-page/hawaii.jpg'
import hawaiii2 from 'public/images/main-page/hawaiii2.jpg'
import honolulu from 'public/images/main-page/honolulu.jpg'
import leadville from 'public/images/main-page/leadville.jpg'
import malibu from 'public/images/main-page/malibu.jpg'
import seattle from 'public/images/main-page/seattle.jpg'
import setup from 'public/images/main-page/setup.jpg'
import { Carousel } from './Carousel'

export function Photos() {
  return (
    <div className="flex-1 columns-2 sm:columns-3 gap-3 my-8">
      <div className="relative h-40 mb-4 rotate-1 my-1">
        <Carousel
          images={[
            <Image
              key={'hawaii'}
              alt="somehwere in hawaii"
              src={hawaii}
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover"
            />,
            <Image
              key={'setup'}
              alt="my computer setup"
              src={setup}
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover"
            />,
          ]}
        />
      </div>
      <div className="relative h-40 md:h-80 mb-4 sm:mb-0 -rotate-1  ">
        <Carousel
          images={[
            <Image
              key={'hawaiii2'}
              alt="somehwere in hawaii"
              src={hawaiii2}
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover object-[-16px] sm:object-center"
            />,
            <Image
              key={'seattle'}
              alt="some brewery in seattle"
              src={seattle}
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover"
            />,
          ]}
        />
      </div>
      <div className="relative h-80 lg:h-80 sm:mb-4 -rotate-1 my-1">
        <Carousel
          images={[
            <Image
              key={'colorado'}
              alt="Me in some colorado mountains during the summer"
              src={colorado}
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover object-top sm:object-center"
            />,
            <Image
              key={'closeup'}
              alt="somewhere in utah skiing"
              src={closeup}
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover"
            />,
          ]}
        />
      </div>
      <div className="relative h-40 mb-4 sm:mb-0 rotate-1 my-2">
        <Carousel
          images={[
            <Image
              key={'brighton'}
              alt="friend and I at Brighton, UT"
              src={brighton}
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover"
            />,
            <Image
              key={'girlfriend'}
              alt="my girlfriend and I "
              src={girlfrield}
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover"
            />,
          ]}
        />
      </div>
      <div className="relative h-40 mb-4 rotate-1 my-2">
        <Carousel
          images={[
            <Image
              key={'malibu'}
              alt="cycling in Malibu, CA"
              src={malibu}
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover"
            />,
            <Image
              key={'doggos'}
              alt="my dogs!"
              src={doggos}
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover"
            />,
          ]}
        />
      </div>
      <div className="relative h-80 -rotate-1 my-1">
        <Carousel
          images={[
            <Image
              key={'honolulu'}
              alt="friends and I completing the honolulu marathon"
              src={honolulu}
              fill
              sizes="(min-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover"
            />,
            <Image
              key={'leadville'}
              alt="me at the leadville marathon"
              src={leadville}
              fill
              sizes="(min-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover"
            />,
          ]}
        />
      </div>
    </div>
  )
}
