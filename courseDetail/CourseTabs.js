import React, { useRef, useState } from "react";
import WhatLearn from "./tabs/Whatlearn";
import Curriculam from "./tabs/Curriculam";
import InstructorDetails from "./tabs/InstructorDetails";
import VenueDetail from "./tabs/VenueDetail";
import { checkIsMobile } from "../../utils/helpers";

// <WhatLearn course={course}/>
//                 <Curriculam />
//                 <InstructorDetails />

const CourseTabs = ({ course }) => {
  const [activeTab, setActiveTab] = useState("tab1");
  const isMobile = checkIsMobile();
  const whatLearnRef = useRef(null);
  const curriculumRef = useRef(null);
  const instructorDetailsRef = useRef(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    const refs = {
      tab1: whatLearnRef,
      tab2: curriculumRef,
      tab3: instructorDetailsRef,
    };
    refs[tabName]?.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    const yOffset = -124; // Adjust the offset as per navbar height
    const element = refs[tabName]?.current;
    const y =
      element?.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col md:gap-5 md:px-6">
      <div className="border-b border-gray-200 mb-10 sticky top-14 z-10 bg-white">
        <nav
          aria-label="Tabs"
          className={`md:-mb-px flex space-x-8 justify-start ${
            isMobile &&
            "flex overflow-x-auto scroll-smooth scroll whitespace-nowrap custom-scroll"
          }`}>
          <a
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("tab1");
            }}
            className={`${
              activeTab == "tab1"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            } md:whitespace-nowrap border-b-2 px-1 py-4 text-base md:text-lg font-medium hover:cursor-pointer`}>
            {"What’ll you learn"}
          </a>
          <a
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("tab2");
            }}
            className={`${
              activeTab == "tab2"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            } whitespace-nowrap border-b-2 px-1 py-4 text-base md:text-lg font-medium hover:cursor-pointer`}>
            {"Curriculum"}
          </a>
          <a
            onClick={(e) => {
              e.preventDefault();
              handleTabClick("tab3");
            }}
            className={`${
              activeTab == "tab3"
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            } whitespace-nowrap border-b-2 px-1 py-4 text-base md:text-lg font-medium hover:cursor-pointer`}>
            {"Instructor Detail"}
          </a>
          {/*  hover:cursor-pointer */}
        </nav>
      </div>
      <div className="flex flex-col gap-8 mb-10">
        <div ref={whatLearnRef}>
          <WhatLearn course={course} />
        </div>
        <div ref={curriculumRef}>
          <Curriculam course={course} />
        </div>
        <div ref={instructorDetailsRef}>
          <InstructorDetails course={course} />
        </div>
        {/* <VenueDetail /> */}
      </div>
    </div>
  );
};

export default CourseTabs;
