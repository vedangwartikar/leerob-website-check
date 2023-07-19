import Image from 'next/image'

import { CAROUSEL_IMAGES } from 'lib/constants'
import { Carousel } from './Carousel'

export function Photos() {
  return (
    <>
      <>
        <div className="flex-1 columns-2 sm:columns-3 gap-3 my-8">
          <div className="relative h-40 mb-4 rotate-1 my-1">
            <Carousel
              images={[
                <Image
                  key={CAROUSEL_IMAGES.hawaii}
                  alt="somehwere in hawaii"
                  src={CAROUSEL_IMAGES.hawaii}
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />,
                <Image
                  key={CAROUSEL_IMAGES.setup}
                  alt="my computer setup"
                  src={CAROUSEL_IMAGES.setup}
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
                  key={CAROUSEL_IMAGES.hawaiii2}
                  alt="somehwere in hawaii"
                  src={CAROUSEL_IMAGES.hawaiii2}
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover object-[-16px] sm:object-center"
                />,
                <Image
                  key={2}
                  alt="some brewery in seattle"
                  src={CAROUSEL_IMAGES.seattle}
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
                  key={CAROUSEL_IMAGES.colorado}
                  alt="Me in some colorado mountains during the summer"
                  src={CAROUSEL_IMAGES.colorado}
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover object-top sm:object-center"
                />,
                <Image
                  key={CAROUSEL_IMAGES.closeup}
                  alt="somewhere in utah skiing"
                  src={CAROUSEL_IMAGES.closeup}
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
                  key={CAROUSEL_IMAGES.brighton}
                  alt="friend and I at Brighton, UT"
                  src={CAROUSEL_IMAGES.brighton}
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />,
                <Image
                  key={CAROUSEL_IMAGES.girlfriend}
                  alt="my girlfriend and I "
                  src={CAROUSEL_IMAGES.girlfriend}
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
                  key={CAROUSEL_IMAGES.malibu}
                  alt="cycling in Malibu, CA"
                  src={CAROUSEL_IMAGES.malibu}
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />,
                <Image
                  key={CAROUSEL_IMAGES.doggos}
                  alt="my dogs!"
                  src={CAROUSEL_IMAGES.doggos}
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
                  key={CAROUSEL_IMAGES.honolulu}
                  alt="friends and I completing the honolulu marathon"
                  src={CAROUSEL_IMAGES.honolulu}
                  fill
                  sizes="(min-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />,
                <Image
                  key={CAROUSEL_IMAGES.leadville}
                  alt="me at the leadville marathon"
                  src={CAROUSEL_IMAGES.leadville}
                  fill
                  sizes="(min-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />,
              ]}
            />
          </div>
        </div>
      </>
    </>
  )
}
