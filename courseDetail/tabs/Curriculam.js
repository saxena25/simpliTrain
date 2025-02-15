import React from "react";
import { DividerWithLeftTitle } from "../../../components/ui-components";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  ArrowDownCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/outline";
import { ArrowUpCircleIcon } from "@heroicons/react/20/solid";
import { checkIsMobile } from "../../../utils/helpers";

const Curriculam = ({ course }) => {
  const isMobile = checkIsMobile();
  const courseCurriculum = course?.courseCurriculum;

  const groupedByMilestone = {};
  courseCurriculum.forEach((item) => {
    const milestoneKey = `milestone${item.milestoneName}`;
    if (!groupedByMilestone[milestoneKey]) {
      groupedByMilestone[milestoneKey] = [];
    }
    groupedByMilestone[milestoneKey].push(item);
  });


  const groupedDurations = courseCurriculum.reduce((acc, course) => {
    const milestoneKey = `milestone${course.milestoneName}`;
    
    // Initialize milestone key if not present
    if (!acc[milestoneKey]) {
      acc[milestoneKey] = 0;
    }

    // Calculate total topic duration for this course
    const topicDuration = course.topics.reduce((sum, topic) => {
      const minutes = parseInt(topic.duration);
      return sum + (isNaN(minutes) ? 0 : minutes);
    }, 0);

    // Add topic duration to the milestone
    acc[milestoneKey] += topicDuration;

    return acc;
  }, {});
    // console.log("groupedByMilestone: ", groupedByMilestone);


  return (
    <div className="flex flex-col">
      <h5 className="text-2xl md:text-3xl text-text font-bold md:mb-5">
        Curriculum
      </h5>
      <div className="grid grid-cols-1 gap-8">
        {Object.keys(groupedByMilestone).map((milestone, index) => (
          <div key={index}>
            <DividerWithLeftTitle>MILESTONE {index + 1}</DividerWithLeftTitle>
            {groupedByMilestone[milestone].map((item, index) => (
              <div className="flex flex-col gap-3 mb-3" key={item.id}>
                <div className="p-3 rounded-lg bg-gray-3">
                  <Disclosure as="div" className="">
                    <DisclosureButton className="relative group flex flex-col md:flex-row w-full items-start justify-between text-left text-gray-900">
                      <span className="text-lg font-semibold">
                        {index + 1}&nbsp; {item.title}
                      </span>
                      <div className=" md:ml-6 flex gap-4 md:h-7 justify-between items-center">
                        <span className="text-base text-gray-1">
                          {item.topics.length} Topics . {groupedDurations[milestone]} min
                        </span>
                        <span
                          className={`md:mt-1 ${
                            isMobile && "absolute right-0 top-2"
                          }`}>
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="size-5 group-data-[open]:hidden"
                          />
                          <ChevronUpIcon
                            aria-hidden="true"
                            className="size-5 group-[&:not([data-open])]:hidden"
                          />
                        </span>
                      </div>
                    </DisclosureButton>
                    <DisclosurePanel as="dd" className="mt-2 pr-12">
                      <p className="text-sm text-text">{item.description}</p>
                    </DisclosurePanel>
                  </Disclosure>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Curriculam;
