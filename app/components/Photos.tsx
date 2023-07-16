import clsx from "clsx";
import Image from "next/image";
import Colorado from "public/images/main-page/colorado.jpg";
import Hawaii1 from "public/images/main-page/hawaii.jpg";
import Hawaii2 from "public/images/main-page/hawaiii2.jpg";
import Brighton from "public/images/main-page/brighton.jpg";
import Honolulu from "public/images/main-page/honolulu.jpg";
import Malibu from "public/images/main-page/malibu.jpg";
import Leadville from "public/images/main-page/leadville.jpg";
import Setup from "public/images/main-page/setup.jpg";
import Seattle from "public/images/main-page/seattle.jpg";
import Closeup from "public/images/main-page/closeup.jpg";
import Doggos from "public/images/main-page/doggos.jpg";
import Girlfriend from "public/images/main-page/girlfriend.jpg";

import { Carousel } from "./Carousel";
// import { EmblaOptionsType } from "embla-carousel-react"

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
                src={Hawaii1}
                fill
                sizes="(max-width: 768px) 213px, 33vw"
                priority
                className="rounded-lg object-cover"
              />,
              <Image
                alt="my computer setup"
                src={Setup}
                fill
                sizes="(max-width: 768px) 213px, 33vw"
                priority
                className="rounded-lg object-cover" />
              ]}
            />
          </div>
          <div className="relative h-40 md:h-80 mb-4 sm:mb-0 -rotate-1  ">
          <Carousel
              images={[
                <Image
                alt="somehwere in hawaii"
                src={Hawaii2}
                fill
                sizes="(max-width: 768px) 213px, 33vw"
                priority
                className="rounded-lg object-cover object-[-16px] sm:object-center"
              />,
              <Image
                alt="some brewery in seattle"
                src={Seattle}
                fill
                sizes="(max-width: 768px) 213px, 33vw"
                priority
                className="rounded-lg object-cover" />
              ]}
            />
          </div>
          <div className="relative h-80 lg:h-80 sm:mb-4 -rotate-1 my-1">
          <Carousel
              images={[
                <Image
                alt="Me in some colorado mountains during the summer"
                src={Colorado}
                fill
                sizes="(max-width: 768px) 213px, 33vw"
                priority
                className="rounded-lg object-cover object-top sm:object-center"
              />,
              <Image
                alt="somewhere in utah skiing"
                src={Closeup}
                fill
                sizes="(max-width: 768px) 213px, 33vw"
                priority
                className="rounded-lg object-cover" />
              ]}
            />
          </div>
          <div className="relative h-40 mb-4 sm:mb-0 rotate-1 my-2">
          <Carousel
              images={[
                <Image
                alt="friend and I at Brighton, UT"
                src={Brighton}
                fill
                sizes="(max-width: 768px) 213px, 33vw"
                priority
                className="rounded-lg object-cover"
              />,
              <Image
                alt="my girlfriend and I "
                src={Girlfriend}
                fill
                sizes="(max-width: 768px) 213px, 33vw"
                priority
                className="rounded-lg object-cover" />

              ]}
            />
          </div>
          <div className="relative h-40 mb-4 rotate-1 my-2">
  
                        <Carousel
              images={[
                <Image
                alt="cycling in Malibu, CA"
                src={Malibu}
                fill
                sizes="(max-width: 768px) 213px, 33vw"
                priority
                className="rounded-lg object-cover"
              />,
              <Image
              alt="my dogs!"
              src={Doggos}
              fill
              sizes="(max-width: 768px) 213px, 33vw"
              priority
              className="rounded-lg object-cover"
            />

              ]}
            />
          </div>
          <div className="relative h-80 -rotate-1 my-1">
            <Carousel
              images={[
                <Image
                  alt="friends and I completing the honolulu marathon"
                  src={Honolulu}
                  fill
                  sizes="(min-width: 768px) 213px, 33vw"
                  priority
                  className="rounded-lg object-cover"
                />,
                <Image
                alt="me at the leadville marathon"
                src={Leadville}
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
