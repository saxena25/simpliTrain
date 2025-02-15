import React, { useState } from "react";
import CourseVenueTab from "./CourseVenue";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { DividerWithLeftTitle } from "../../components/ui-components";
import { checkIsMobile } from "../../utils/helpers";

function OneDrawer({ open, onClose, batch }) {
  const isMobile = checkIsMobile();
  const [step, setStep] = useState(1);
  // console.log("oneononeBatch: ", batch);

  const groupedByMilestone = {};
  batch[0]?.batchCurriculumDetails?.forEach((item) => {
    const milestoneKey = `milestone${item?.miltstoneName}`;
    if (!groupedByMilestone[milestoneKey]) {
      groupedByMilestone[milestoneKey] = [];
    }
    groupedByMilestone[milestoneKey].push(item);
  });

  const groupedDurations = batch[0]?.batchCurriculumDetails?.reduce(
    (acc, course) => {
      const milestoneKey = `milestone${course?.miltstoneName}`;

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
    },
    {}
  );

  // console.log("groupedByMilestone: ", groupedByMilestone);
  // console.log("groupedDurations: ", groupedDurations);
  // console.log("courseCurriculum: ", batch[0]?.batchCurriculumDetails);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="relative z-50"
      style={{ zIndex: 1000 }}>
      <div className="fixed inset-0" style={{ background: "#00000040" }} />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden h-full">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full h-full p-0">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-4xl h-full transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700 overflow-hidden">
              <div className="flex flex-col items-start w-full h-full bg-white">
                {/* header */}
                <div className="w-full border-b">
                  <div className="w-full flex flex-row justify-between gap-2 px-8 pt-5 sticky top-0">
                    <div className="w-full pb-5">
                      <span className="text-3xl text-text font-semibold">
                        {step === 1 ? "One on One" : step === 2 ? "Schedule One on One" : "Schedule One on One"}
                      </span>
                      <span className="ml-2 text-xs text-gray-500 font-medium border rounded-full py-px px-2">
                        {step === 1 && "ONLINE"}
                      </span>
                      <p className="text-sm text-gray-500 font-medium pt-1">
                        {step === 1 ? "1 Day course | 60 min class" : "Choose a date & time (for 1 Day Class)"}
                      </p>
                    </div>
                    {/* close button */}
                    <div className="mt-2">
                      <div className="flex flex-row items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => onClose(false)}
                          className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* body */}
                {step === 1 ? (
                  <div className="w-full flex flex-col px-8 pt-5">
                    <h5 className="text-2xl text-text font-semibold">
                      Schedules
                    </h5>
                    <div className="grid grid-cols-1 gap-8">
                      {Object.keys(groupedByMilestone).map((milestone, index) => (
                        <div key={index}>
                          <DividerWithLeftTitle>
                            MILESTONE {index + 1}
                          </DividerWithLeftTitle>
                          {groupedByMilestone[milestone].map((item, index) => (
                            <div
                              className="flex flex-col gap-3 mb-3"
                              key={item.id}>
                              <div className="p-3 rounded-xl border">
                                <Disclosure as="div" className="">
                                  <DisclosureButton className="relative group flex flex-col md:flex-row w-full items-start justify-between text-left text-gray-900">
                                    <span className="text-lg font-semibold">
                                      {index + 1}&nbsp; {item.title}
                                    </span>
                                    <div className=" md:ml-6 flex gap-4 md:h-7 justify-between items-center">
                                      <span className="text-base text-gray-1">
                                        {item.topics.length} Topics .{" "}
                                        {groupedDurations[milestone]} min
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
                                    <p className="text-sm text-text">
                                      {item.description}
                                    </p>
                                  </DisclosurePanel>
                                </Disclosure>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ): step === 2 ? (
                  <div>Hello 2</div>
                ) : step === 3 && (
                  <div>hello 3</div>
                )}

                {/* footer */}
                <div className="w-full border-t fixed bottom-0">
                  <div className="w-full flex flex-row justify-between items-center py-3 px-8">
                    <div>
                      <h4 className="flex flex-row justify-start items-center gap-3">
                        <span className="text-xl text-text font-semibold">
                          ₹ 30,090
                        </span>
                        <span className="text-sm text-gray-600 font-medium">
                          20% Off
                        </span>
                      </h4>
                      <h6 className="text-sm  text-gray-600 font-medium">
                        <del>₹ 14,057</del>
                      </h6>
                    </div>
                    <div>
                      <p
                        onClick={() => {
                          setStep(step + 1);
                          if(step === 3){
                            onClose(false);
                            setTimeout(()=>{
                              setStep(1);
                            },200)
                          }
                        }}
                        className="rounded-2xl bg-primary px-3.5 py-2.5 w-48 flex justify-center text-lg font-semibold text-white shadow-sm hover:bg-dark hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                        {step === 1
                          ? "SELECT SCHEDULE"
                          : step === 2
                          ? "CONTINUE"
                          : step === 3 && "ENROLL NOW"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default OneDrawer;
