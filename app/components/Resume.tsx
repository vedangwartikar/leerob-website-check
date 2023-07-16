import Image, { StaticImageData } from "next/image";
import smashing from "public/images/home/smashing.jpg";
import summit from "public/images/home/summit.jpg";
import reactathon from "public/images/home/reactathon.jpg";
import ship from "public/images/home/ship.jpg";
import filming from "public/images/home/filming.jpg";
import meetups from "public/images/home/meetups.jpg";
import ViewCounter from "app/blog/view-counter";
import { PropsWithChildren, Suspense } from "react";
import { allBlogs } from "contentlayer/generated";
import { allBlogsSorted } from "lib/utils";
import { ArrowDownIcon, BriefcaseIcon } from "./icons";
import XealthLogo from "public/images/main-page/logo-xealth.jpg";
import StateFarm from "public/images/main-page/logo-state-farm.png";
import CocaCola from "public/images/main-page/logo-coca-cola.png";
import Emory from "public/images/main-page/logo-emory.png";
import { Button } from "./Button";

export function Resume() {
  let resume = [
    {
      company: "Xealth Inc.",
      title: "Software Engineer Technical Lead",
      logo: XealthLogo,
      start: "2021",
      end: {
        label: "Present",
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: "State Farm",
      title: "Data Engineer/Software Engineer",
      logo: StateFarm,
      start: "2020",
      end: "2021",
    },
    {
      company: "Coca-Cola One North America",
      title: "Data Engineer",
      logo: CocaCola,
      start: "2019",
      end: "2020",
    },
    {
      company: "Emory University",
      title: "Bachelor of Arts in Economics & Econometrics",
      logo: Emory,
      start: "2015",
      end: "2019",
    },
  ] as {
    company: string;
    title: string;
    logo: StaticImageData;
    start: string | { label: string; dateTime: number };
    end: string | { label: string; dateTime: number };
  }[];

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">work stuff</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image src={role.logo} alt="" className="h-7 w-7" unoptimized  width={7} height={7}/>
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${
                  typeof role.start === "object" ? role.start.label : role.start
                } until ${
                  typeof role.end === "object" ? role.end.label : role.end
                }`}
              >
                <time
                  dateTime={
                    typeof role.start === "object"
                      ? `${role.start.dateTime}`
                      : role.start
                  }
                >
                  {typeof role.start === "object"
                    ? role.start.label
                    : role.start}
                </time>{" "}
                <span aria-hidden="true">—</span>{" "}
                <time
                  dateTime={
                    typeof role.end === "object"
                      ? `${role.end.dateTime}`
                      : role.end
                  }
                >
                  {typeof role.end === "object" ? role.end.label : role.end}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  );
}
