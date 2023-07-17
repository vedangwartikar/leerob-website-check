import Image from "next/image";

import { Carousel } from "./Carousel";

export function Photos() {
  let rotations = [
    "rotate-1",
    "-rotate-1",
    "rotate-1",
    "rotate-1",
    "-rotate-1",
  ];
  // const OPTIONS: EmblaOptionsType = { loop: true }
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <>
      <>
        <div className="flex-1 columns-2 sm:columns-3 gap-3 my-8">
          <div className="relative h-40 mb-4 rotate-1 my-1">
            <Carousel
              images={[
                <Image
                  alt="somehwere in hawaii"
                  src={
                    "https://media.michaelangrivera.com/michaelangrivera/images/main-page/hawaii.jpg"
                  }
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />,
                <Image
                  alt="my computer setup"
                  src={
                    "https://media.michaelangrivera.com/michaelangrivera/images/main-page/setup.jpg"
                  }
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
                  alt="somehwere in hawaii"
                  src={
                    "https://media.michaelangrivera.com/michaelangrivera/images/main-page/hawaiii2.jpg"
                  }
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover object-[-16px] sm:object-center"
                />,
                <Image
                  alt="some brewery in seattle"
                  src={
                    "https://media.michaelangrivera.com/michaelangrivera/images/main-page/seattle.jpg"
                  }
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
                  alt="Me in some colorado mountains during the summer"
                  src={
                    "https://media.michaelangrivera.com/michaelangrivera/images/main-page/colorado.jpg"
                  }
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover object-top sm:object-center"
                />,
                <Image
                  alt="somewhere in utah skiing"
                  src={
                    "https://media.michaelangrivera.com/michaelangrivera/images/main-page/closeup.jpg"
                  }
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
                  alt="friend and I at Brighton, UT"
                  src={
                    "https://media.michaelangrivera.com/michaelangrivera/images/main-page/brighton.jpg"
                  }
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />,
                <Image
                  alt="my girlfriend and I "
                  src={
                    "https://media.michaelangrivera.com/michaelangrivera/images/main-page/girlfriend.jpg"
                  }
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
                  alt="cycling in Malibu, CA"
                  src={
                    "https://media.michaelangrivera.com/michaelangrivera/images/main-page/malibu.jpg"
                  }
                  fill
                  sizes="(max-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />,
                <Image
                  alt="my dogs!"
                  src={
                    "https://media.michaelangrivera.com/michaelangrivera/images/main-page/doggos.jpg"
                  }
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
                  alt="friends and I completing the honolulu marathon"
                  src={
                    "https://media.michaelangrivera.com/michaelangrivera/images/main-page/honolulu.jpg"
                  }
                  fill
                  sizes="(min-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />,
                <Image
                  alt="me at the leadville marathon"
                  src={
                    "https://media.michaelangrivera.com/michaelangrivera/images/main-page/leadville.jpg"
                  }
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
  );
}
