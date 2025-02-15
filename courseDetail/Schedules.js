import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  CheckIcon,
  HandThumbUpIcon,
  MinusSmallIcon,
  PlusSmallIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { checkIsMobile } from "../../utils/helpers";
import moment from "moment";

const timeline = [
  {
    id: 1,
    content: "Applied to",
    target: "Front End Developer",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: UserIcon,
    iconBackground: "bg-gray-400",
  },
  {
    id: 2,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    href: "#",
    date: "Sep 22",
    datetime: "2020-09-22",
    icon: HandThumbUpIcon,
    iconBackground: "bg-blue-500",
  },
  {
    id: 3,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    href: "#",
    date: "Sep 28",
    datetime: "2020-09-28",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
  },
  {
    id: 1,
    content: "Applied to",
    target: "Front End Developer",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: UserIcon,
    iconBackground: "bg-gray-400",
  },
  {
    id: 2,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    href: "#",
    date: "Sep 22",
    datetime: "2020-09-22",
    icon: HandThumbUpIcon,
    iconBackground: "bg-blue-500",
  },
  {
    id: 3,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    href: "#",
    date: "Sep 28",
    datetime: "2020-09-28",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
  },
  {
    id: 1,
    content: "Applied to",
    target: "Front End Developer",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: UserIcon,
    iconBackground: "bg-gray-400",
  },
  {
    id: 2,
    content: "Advanced to phone screening by",
    target: "Bethany Blake",
    href: "#",
    date: "Sep 22",
    datetime: "2020-09-22",
    icon: HandThumbUpIcon,
    iconBackground: "bg-blue-500",
  },
  {
    id: 3,
    content: "Completed phone screening with",
    target: "Martha Gardner",
    href: "#",
    date: "Sep 28",
    datetime: "2020-09-28",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SchedulesTab = ({ batch }) => {
  const isMobile = checkIsMobile();
  const groupByClassName = batch?.batchCurriculumDetails.reduce((acc, item) => {
    acc[item.className] = acc[item.className] || [];
    acc[item.className].push(item);
    return acc;
  }, {});
  console.log("schedules: ", batch);
  console.log("grouped: ", groupByClassName);
  return (
    <>
      <h3 className="text-2xl text-text font-semibold mb-4">Schedules</h3>
      <div className="w-full">
        <ul role="list" className="w-full">
          {batch?.batchClasses.map((event, eventIdx) => {
            const startTime = moment(event.start_time); // Convert start time
            const endTime = moment(event.start_time)
              .add(1, "hour")
              .add(45, "minutes"); // Example end time

            const formattedTime = `${startTime.format(
              "dddd, MMM DD, h:mmA"
            )} - ${endTime.format("hA")}`;
            const classData = groupByClassName[eventIdx + 1] || [];

            return (
              <li key={event.id} className="w-full">
                <div className="relative pb-8">
                  {eventIdx !== batch?.batchClasses.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute left-[53px] md:left-[61px] top-4 -ml-px h-full w-1 bg-gray-200"
                    />
                  ) : null}
                  <div className="relative flex flex-row space-x-3">
                    <div className="flex flex-row w-[78px] justify-between items-start">
                      <span className="text-sm font-medium text-text text-nowrap">
                        Class {eventIdx + 1}
                      </span>
                      <svg
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle
                          cx="6.70652"
                          cy="7.58933"
                          r="6.28736"
                          fill="#F0F0F0"
                          stroke="#8B929F"
                          strokeWidth="0.838315"
                        />
                      </svg>
                    </div>
                    <div className="flex w-full">
                      <div className="py-2.5 px-5 border border-gray-5 rounded-2xl w-full">
                        <Disclosure as="div" className="">
                          <DisclosureButton className="group flex w-full items-center md:items-start justify-between text-left text-gray-900">
                            <span className="text-sm md:text-lg font-semibold">
                              {formattedTime}
                            </span>
                            <span className=" md:ml-6 flex h-7 items-center">
                              <PlusSmallIcon
                                aria-hidden="true"
                                className="size-6 group-data-[open]:hidden"
                              />
                              <MinusSmallIcon
                                aria-hidden="true"
                                className="size-6 group-[&:not([data-open])]:hidden"
                              />
                            </span>
                          </DisclosureButton>
                          <DisclosurePanel as="dd" className="mt-2 md:pr-12">
                            <div className="flex flex-col gap-2 py-3">
                              {classData.length > 0 ? (
                                classData[0].topics.map((topic, topicIndex) => (
                                  <p
                                    key={topicIndex}
                                    className="flex flex-row gap-3 text-sm md:text-sm text-text font-normal">
                                    <span>{topicIndex + 1}.</span>
                                    <strong>{topic.title}</strong>
                                  </p>
                                ))
                              ) : (
                                <p className="text-sm text-gray-500">
                                  No topics available
                                </p>
                              )}
                            </div>
                          </DisclosurePanel>
                        </Disclosure>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SchedulesTab;
