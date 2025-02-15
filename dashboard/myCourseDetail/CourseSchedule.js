import React from "react";
import { useState, useRef } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import downArrow from "../../../assets/svgs/downArrow.svg";
import upArrow from "../../../assets/svgs/upArrow.svg";
import inBox from "../../../assets/svgs/inBox.svg";
import topic from "../../../assets/svgs/topic.svg";
import poll from "../../../assets/svgs/poll.svg";
import quiz from "../../../assets/svgs/quiz.svg";
import { checkIsMobile } from "../../../utils/helpers";

function CourseSchedule() {
  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [Schedules, setSchedules] = useState([
    {
      date: "04",
      month: "AUG",
      class: "1",
      classCompleted: true,
      detailDateTime: "Sunday, Aug 04, 9:15AM - 11AM",
      chapters: "3 Chapters",
      title: [
        {
          number: "1",
          titleName: "What is UI/UX Benefits",
          numberOfTopics: "2 Topics . 30min",
        },
        {
          number: "2",
          titleName: "UX Design Thinking Process",
          numberOfTopics: "3 Topics . 30min",
        },
        {
          number: "3",
          titleName: "Heuristic Evaluation in UX",
          numberOfTopics: "5 Topics . 30min",
        },
      ],
    },
    {
      date: "08",
      month: "AUG",
      class: "2",
      classCompleted: false,
      detailDateTime: "Monday, Aug 12, 9:15AM - 11AM",
      chapters: "3 Chapters",
      title: [
        {
          number: "1",
          titleName: "What is UI/UX Benefits",
          numberOfTopics: "2 Topics . 30min",
        },
        {
          number: "2",
          titleName: "UX Design Thinking Process",
          numberOfTopics: "3 Topics . 30min",
        },
        {
          number: "3",
          titleName: "Heuristic Evaluation in UX",
          numberOfTopics: "5 Topics . 30min",
        },
      ],
    },
    {
      date: "12",
      month: "AUG",
      class: "3",
      classCompleted: false,
      detailDateTime: "Tuesday, Aug 16, 9:15AM - 11AM",
      chapters: "3 Chapters",
      title: [
        {
          number: "1",
          titleName: "What is UI/UX Benefits",
          numberOfTopics: "2 Topics . 30min",
        },
        {
          number: "2",
          titleName: "UX Design Thinking Process",
          numberOfTopics: "3 Topics . 30min",
        },
        {
          number: "3",
          titleName: "Heuristic Evaluation in UX",
          numberOfTopics: "5 Topics . 30min",
        },
      ],
    },
    {
      date: "16",
      month: "AUG",
      class: "4",
      classCompleted: true,
      detailDateTime: "Wednesday, Aug 20, 9:15AM - 11AM",
      chapters: "3 Chapters",
      title: [
        {
          number: "1",
          titleName: "What is UI/UX Benefits",
          numberOfTopics: "2 Topics . 30min",
        },
        {
          number: "2",
          titleName: "UX Design Thinking Process",
          numberOfTopics: "3 Topics . 30min",
        },
        {
          number: "3",
          titleName: "Heuristic Evaluation in UX",
          numberOfTopics: "5 Topics . 30min",
        },
      ],
    },
    {
      date: "12",
      month: "AUG",
      class: "3",
      classCompleted: false,
      detailDateTime: "Tuesday, Aug 16, 9:15AM - 11AM",
      chapters: "3 Chapters",
      title: [
        {
          number: "1",
          titleName: "What is UI/UX Benefits",
          numberOfTopics: "2 Topics . 30min",
        },
        {
          number: "2",
          titleName: "UX Design Thinking Process",
          numberOfTopics: "3 Topics . 30min",
        },
        {
          number: "3",
          titleName: "Heuristic Evaluation in UX",
          numberOfTopics: "5 Topics . 30min",
        },
      ],
    },
    {
      date: "16",
      month: "AUG",
      class: "4",
      classCompleted: true,
      detailDateTime: "Wednesday, Aug 20, 9:15AM - 11AM",
      chapters: "3 Chapters",
      title: [
        {
          number: "1",
          titleName: "What is UI/UX Benefits",
          numberOfTopics: "2 Topics . 30min",
        },
        {
          number: "2",
          titleName: "UX Design Thinking Process",
          numberOfTopics: "3 Topics . 30min",
        },
        {
          number: "3",
          titleName: "Heuristic Evaluation in UX",
          numberOfTopics: "5 Topics . 30min",
        },
      ],
    },
    {
      date: "12",
      month: "AUG",
      class: "3",
      classCompleted: false,
      detailDateTime: "Tuesday, Aug 16, 9:15AM - 11AM",
      chapters: "3 Chapters",
      title: [
        {
          number: "1",
          titleName: "What is UI/UX Benefits",
          numberOfTopics: "2 Topics . 30min",
        },
        {
          number: "2",
          titleName: "UX Design Thinking Process",
          numberOfTopics: "3 Topics . 30min",
        },
        {
          number: "3",
          titleName: "Heuristic Evaluation in UX",
          numberOfTopics: "5 Topics . 30min",
        },
      ],
    },
    {
      date: "16",
      month: "AUG",
      class: "4",
      classCompleted: true,
      detailDateTime: "Wednesday, Aug 20, 9:15AM - 11AM",
      chapters: "3 Chapters",
      title: [
        {
          number: "1",
          titleName: "What is UI/UX Benefits",
          numberOfTopics: "2 Topics . 30min",
        },
        {
          number: "2",
          titleName: "UX Design Thinking Process",
          numberOfTopics: "3 Topics . 30min",
        },
        {
          number: "3",
          titleName: "Heuristic Evaluation in UX",
          numberOfTopics: "5 Topics . 30min",
        },
      ],
    },
  ]);
  const isMobile = checkIsMobile();
  //   let data = useLoaderData();

  const onSlideChange = (iin) => {
    console.log("iin", iin);
  };

  const goToPrev = () => {
    carouselRef.current.prev();

    setCurrentSlide(currentSlide - 1);
  };

  const goToNext = () => {
    carouselRef.current.next();

    setCurrentSlide(currentSlide + 1);
  };

  return (
    <div className="bg-gray-100 px-2 md:px-6 py-4 w-full">
      <h1 className="text-sm text-gray-500 font-medium px-3 md:px-0">
        4 Classes Scheduled. Yet to Begin
      </h1>
      <div>
        <div className="flex flex-col md:mt-2">
          {Schedules.map((ele, index) => (
            <div className="py-3 rounded-none">
              <Disclosure
                as="div"
                className="bg-white rounded-2xl md:px-8 py-3">
                <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                  <div className="w-full flex flex-row md:gap-4">
                    <div
                      className={`flex flex-col items-center  ${
                        isMobile ? "w-9 px-10" : ""
                      }`}>
                      <h1 className="text-3xl font-secondary font-medium pt-4">
                        {ele.date}
                      </h1>
                      <p className="text-xs text-gray-500 pb-2 font-medium">
                        {ele.month}
                      </p>
                    </div>
                    {isMobile ? (
                      <div className="flex flex-row justify-between w-full items-center pr-5">
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-row gap-2">
                            {ele.classCompleted ? (
                              <p className="text-xs text-white border-2 border-green-500 bg-green-500 rounded-full px-1 h-fit font-medium">
                                Class {ele.class} - Completed
                              </p>
                            ) : (
                              <p className="text-sm text-primary border border-gray-300 rounded-full px-1 h-fit font-medium">
                                Class {ele.class}
                              </p>
                            )}
                            <p className="text-sm text-gray-600">
                              {ele.chapters}
                            </p>
                          </div>
                          <p className="text-sm text-[#191919] font-medium">
                            {ele.detailDateTime}
                          </p>
                        </div>
                        <div>
                          <img
                            src={downArrow}
                            alt="downArrow"
                            className="size-4 group-data-[open]:hidden"
                          />
                          <img
                            src={upArrow}
                            alt="upArrow"
                            className="size-4 group-[&:not([data-open])]:hidden"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-row justify-between w-full items-center">
                        <div className="flex flex-row gap-1">
                          {ele.classCompleted ? (
                            <p className="text-xs md:text-sm text-white border-2 border-green-600 bg-green-500 rounded-full px-3 md:px-1 py-px h-fit font-medium">
                              Class {ele.class} - Completed
                            </p>
                          ) : (
                            <p className="text-sm text-primary border border-gray-300 rounded-full px-3 py-px h-fit font-medium">
                              Class {ele.class}
                            </p>
                          )}

                          <p className="text-base text-primary font-semibold">
                            {ele.detailDateTime}
                          </p>
                        </div>
                        <div className="flex flex-row gap-2">
                          <p className="text-base font-semibold">
                            {ele.chapters}
                          </p>
                          <img
                            src={downArrow}
                            alt="downArrow"
                            className="size-5 group-data-[open]:hidden"
                          />
                          <img
                            src={upArrow}
                            alt="upArrow"
                            className="size-5 group-[&:not([data-open])]:hidden"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </DisclosureButton>
                <DisclosurePanel
                  as="dd"
                  className={`"mt-2 flex flex-col gap-3 ${isMobile ? "pr-5" : ""}`}>
                  {ele.title.map((item, index) => (
                    <div
                      className="ml-auto md:ml-auto md:px-4 py-1 border border-gray-4 rounded-2xl w-3/4 "
                      key={index}>
                      <Disclosure
                        as="div"
                        className="bg-white rounded-2xl py-3">
                        <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                          <div className="px-4 md:px-0 w-full flex flex-row justify-between items-center">
                            {isMobile ? (
                              <div className="flex flex-row justify-between w-full">
                                <div className="flex flex-row gap-2">
                                  <p className="text-sm font-medium text-[#000000]">{item.number}.</p>
                                  <div>
                                    <h1 className="text-sm font-medium text-[#000000]">{item.titleName}</h1>
                                    <p className="text-xs text-gray-600">{item.numberOfTopics}</p>
                                  </div>
                                </div>
                                <div className="mt-1">
                                  <img
                                    src={downArrow}
                                    alt="downArrow"
                                    className="size-5 group-data-[open]:hidden"
                                  />
                                  <img
                                    src={upArrow}
                                    alt="upArrow"
                                    className="size-5 group-[&:not([data-open])]:hidden"
                                  />
                                </div>
                              </div>
                            ) : (
                              <>
                                <div className="flex flex-row gap-4">
                                  <p className="text-base text-secondary font-semibold">
                                    {item.number}
                                  </p>
                                  <h1 className="text-base text-secondary font-semibold">
                                    {item.titleName}
                                  </h1>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                  <p className="text-sm text-primary font-medium">
                                    {item.numberOfTopics}
                                  </p>
                                  <img
                                    src={downArrow}
                                    alt="downArrow"
                                    className="size-5 group-data-[open]:hidden"
                                  />
                                  <img
                                    src={upArrow}
                                    alt="upArrow"
                                    className="size-5 group-[&:not([data-open])]:hidden"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        </DisclosureButton>
                        <DisclosurePanel
                          as="div"
                          className="mt-2 md:pr-0 flex flex-col gap-4">
                          {/* heading content */}
                          <div>
                            <p className="text-sm text-gray-500 font-medium pl-8 pr-4 md:pr-0 md:pl-5  max-w-md">
                              This course designed to guide participants through
                              choosing and advancing in their professional
                              journeys.
                            </p>
                          </div>
                          {/* topics */}
                          <div className="flex flex-col gap-2 px-3 md:px-0 md:pl-0">
                            <div className="flex flex-row gap-1 md:gap-2">
                              <img src={topic} alt="" />
                              <p className="text-sm md:text-base text-secondary font-semibold">
                                Topics
                              </p>
                            </div>
                            <div className="flex flex-col pl-5 md:pl-6 gap-2">
                              <div className="flex flex-row justify-between ">
                                <p className="text-xs md:text-sm text-secondary font-semibold">
                                  1. Introduction to UX Design Principles
                                </p>
                                <p className="text-xs md:text-sm text-gray-500 md:font-semibold">
                                  10 min
                                </p>
                              </div>
                              <div className="flex flex-row justify-between ">
                                <p className="text-xs md:text-sm text-secondary font-semibold">
                                  2. Introduction to UX Design Principles
                                </p>
                                <p className="text-xs md:text-sm text-gray-500 md:font-semibold">
                                  10 min
                                </p>
                              </div>
                              <div className="flex flex-row justify-between ">
                                <p className="text-xs md:text-sm text-secondary font-semibold">
                                  3. Introduction to UX Design Principles
                                </p>
                                <p className="text-xs md:text-sm text-gray-500 md:font-semibold">
                                  10 min
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* poll quiz */}
                          <div className="px-2 md:px-0">
                            <div className="flex flex-col gap-2 border px-3 md:px-4 py-4 rounded-tr-2xl rounded-tl-2xl">
                              <div className="flex flex-row gap-2 md:gap-4">
                                <img src={inBox} alt="" className="w-4 md:w-5" />
                                <p className="text-sm text-secondary font-medium md:font-bold">
                                  Learning Materials
                                </p>
                              </div>
                              <div className="flex flex-col gap-2 pl-5 md:pl-0 md:px-9">
                                <button className="text-xs md:text-sm border-b border-b-black w-fit">
                                  Typography Basics in Figma* (PDF)
                                </button>
                                <button className="text-xs md:text-sm border-b border-b-black w-fit">
                                  Figma Shortcuts Cheat Sheet* (PDF)
                                </button>
                                <button className="text-xs md:text-sm border-b border-b-black w-fit">
                                  Intro Sheet* (PDF)
                                </button>
                              </div>
                            </div>

                            <div className="flex flex-col gap-2 border px-3 md:px-4 py-4">
                              <div className="flex flex-row gap-2 md:gap-4">
                                <img src={poll} alt="" className="w-4 md:w-5" />
                                <p className="text-sm text-secondary font-medium md:font-bold">
                                  Poll
                                </p>
                              </div>
                              <div className="pl-5 md:pl-0 md:px-0">
                                <button className="text-xs md:text-sm border-b border-b-black w-fit md:whitespace-nowrap">
                                  Which aspect of UX design do you find most
                                  challenging?
                                </button>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 border px-3 md:px-4 py-4 rounded-br-2xl rounded-bl-2xl">
                              <div className="flex flex-row gap-2 md:gap-4">
                                <img src={quiz} alt="" className="w-5 md:w-5" />
                                <p className="text-sm text-secondary font-medium md:font-bold">
                                  Quiz
                                </p>
                              </div>
                              <div className="pl-5 md:pl-0 md:px-0">
                                <button className="text-xs md:text-sm border-b border-b-black w-fit md:whitespace-nowrap">
                                  Test your understanding of basic UX principles
                                  and Figma tools.
                                </button>
                              </div>
                            </div>
                          </div>
                        </DisclosurePanel>
                      </Disclosure>
                    </div>
                  ))}
                </DisclosurePanel>
              </Disclosure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseSchedule;
