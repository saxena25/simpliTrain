import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import CourseCard from "../courses/courseCard";
import { Link } from "react-router-dom";
import { checkIsMobile } from "../../utils/helpers";
import CourseItemCard from "../../components/shared-components/CourseItemCard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PopularCourses = ({courses}) => {
  const isMobile = checkIsMobile();
  const tabsData = [
    { name: "Artificial Intelligence", href: "#", current: true },
    { name: "Product Design", href: "#", current: false },
    { name: "UX Research", href: "#", current: false },
    { name: "Prototyping", href: "#", current: false },
    { name: "Heuristic Evaluation", href: "#", current: false },
  ];
  const [tabs, setTabs] = useState(tabsData);
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.current).name
  );
  const [popularCoursesData, setPopularCoursesData] = useState(courses || []);

  const handleTabClick = (tabName) => {
    if (activeTab !== tabName) {
      setActiveTab(tabName);

      setTabs((prevTabs) =>
        prevTabs.map((tab) => ({
          ...tab,
          current: tab.name === tabName,
        }))
      );
    //   fetchCourses(tabName);
    }
  };
  return (
    <div className={`${popularCoursesData.length > 0 ? "flex": "hidden"} flex-col`}>
      <div className="flex flex-row justify-between items-center mb-3">
        <h5 className="text-2xl md:text-3xl lg:text-3xl font-bold ">
          Popular Courses
        </h5>
        <button className="w-20 flex flex-row justify-between items-center">
          <span className="text-lg font-medium text-text">See All</span>
          <ArrowRightIcon className="size-5" />
        </button>
      </div>
      <div
        className={`flex flex-row md:gap-5 ${
          isMobile &&
          "justify-start overflow-x-scroll scroll whitespace-nowrap scroll-smooth gap-2 "
        } custom-scroll`}>
            <nav
          className={`flex md:gap-4 justify-center ${
            isMobile &&
            " overflow-x-scroll scroll whitespace-nowrap scroll-smooth custom-scroll"
          }`}>
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(tab.name);
              }}
              aria-current={tab.current ? "page" : undefined}
              className={classNames(
                tab.current
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "text-gray-500  hover:text-gray-700",
                "whitespace-nowrap px-4 rounded-full py-1  text-sm font-medium border border-gray-300"
              )}>
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
      <div
        className={`md:grid md:grid-cols-3 md:gap-10 py-10 ${
          isMobile && "flex gap-5 overflow-x-auto scroll-smooth "
        } custom-scroll `}>
        {popularCoursesData.slice(0,3).map((item, index) => (
          <Link
            to={"/courses/courseid"}
            key={index + 1}
            className={`${isMobile && "shrink-0 w-80"}`}>
            {/* <CourseCard type={index} /> */}
            <CourseItemCard type={index} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
