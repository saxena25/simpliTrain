import React, { useState } from "react";
import { checkIsMobile } from "../../../utils/helpers";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import {
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
  Menu,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import all from "../../../assets/svgs/all.svg";
import Todo from "../myCourseDetail/Todo";
import InProgress from "../myCourseDetail/InProgress";
import ReviewAssessment from "../myCourseDetail/ReviewAssessment";
import Completed from "../myCourseDetail/Completed";

export async function MyAssessmentLoader() {
  return {
    date: new Date().toISOString(),
  };
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MyAssessment() {
  const tabsData = [
    { name: "Todo", href: "#", task: "2", current: true },
    { name: "In Progress", href: "#", task: "5", current: false },
    { name: "Submitted For Review", task: "1", href: "#", current: false },
    { name: "Completed", href: "#", task: "3", current: false },
  ];
  const isMobile = checkIsMobile();
  const [tabs, setTabs] = useState(tabsData);
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.current).name
  );

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.name === tabName
          ? { ...tab, current: true }
          : { ...tab, current: false }
      )
    );
  };
  return (
    <div className="w-full h-[calc(100vh-64px)] bg-gray-100">
      {isMobile && (
        <div className="flex flex-row justify-between items-center w-full px-5 pt-5">
          <ArrowLeftIcon className="w-10 rounded-full bg-white p-2" onClick={() => window.history.back()} />
          <Menu
            as="div"
            className="relative inline-block text-left rounded-full z-30">
            <MenuButton className="flex flex-row justify-evenly items-center px-2 py-1 gap-1 rounded-4xl border border-gray-300">
              <img src={all} alt="" />
              <p className="text-sm">All</p>
            </MenuButton>

            <MenuItems
              transition
              // right-0 z-10 mt-2
              className="absolute z-10 right-0 top-[46px] w-36 origin-top-right divide-y divide-gray-6 rounded-2xl bg-white shadow-3xl transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in flex flex-col justify-center">
              <div className="py-4 px-4 flex flex-col gap-3">
                <MenuItem as="div" className="flex flex-row gap-2 items-center">
                  <input type="radio" name="all" />
                  <label
                    htmlFor="all"
                    className="text-base text-secondary font-semibold">
                    All
                  </label>
                </MenuItem>
                <MenuItem as="div" className="flex flex-row gap-2 items-center">
                  <input type="radio" name="quiz" />
                  <label
                    htmlFor="quiz"
                    className="text-base text-secondary font-semibold">
                    Quiz
                  </label>
                </MenuItem>
                <MenuItem as="div" className="flex flex-row gap-2 items-center">
                  <input type="radio" name="assessment" />
                  <label
                    htmlFor="assessment"
                    className="text-base text-secondary font-semibold">
                    Assessment
                  </label>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      )}
      <div className=" bg-gray-100 w-full">
        <h1 className="text-[28px] font-semibold text-secondary mt-5 px-5 md:px-10">
          My Assessments
        </h1>
        <div className="sticky top-0 bg-gray-100 z-10 flex flex-row justify-between items-center mt-2 my-4 border-b border-gray-300 md:mt-4 md:mb-8">
          <nav
            aria-label="Tabs"
            className={`md:-mb-px flex md:px-10 md:space-x-8  ${
              isMobile &&
              "justify-start overflow-x-auto scroll whitespace-normal scroll-smooth gap-2 custom-scroll ml-5 "
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
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap border-b-2 px-1 pt-2 pb-4 text-base md:text-lg lg:text-lg xl:text-lg font-medium"
                )}>
                {tab.name}{" "}
                {tab.task === "" ? null : (
                  <span
                    className={classNames(
                      tab.current ? "text-gray-900" : "text-gray-500",
                      "bg-gray-200 px-2 py-px rounded-lg ml-px"
                    )}>
                    {tab.task}
                  </span>
                )}
              </a>
            ))}
          </nav>
          
          {!isMobile && (
            <Menu
              as="div"
              className="relative inline-block text-left bg-gray-100 rounded-full md:mr-10">
              <MenuButton className="flex flex-row justify-evenly items-center px-3 py-1 gap-1 rounded-4xl border hover:shadow-3xl">
                <img src={all} alt="" />
                <p>All</p>
              </MenuButton>

              <MenuItems
                transition
                // right-0 z-10 mt-2
                className="absolute z-10 right-0 top-[46px] w-44 origin-top-right divide-y divide-gray-6 rounded-2xl bg-white shadow-3xl transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in flex flex-col justify-center">
                <div className="py-6 px-8 flex flex-col gap-3">
                  <MenuItem
                    as="div"
                    className="flex flex-row gap-2 items-center">
                    <input type="radio" name="all" />
                    <label
                      htmlFor="all"
                      className="text-base text-secondary font-semibold">
                      All
                    </label>
                  </MenuItem>
                  <MenuItem
                    as="div"
                    className="flex flex-row gap-2 items-center">
                    <input type="radio" name="quiz" />
                    <label
                      htmlFor="quiz"
                      className="text-base text-secondary font-semibold">
                      Quiz
                    </label>
                  </MenuItem>
                  <MenuItem
                    as="div"
                    className="flex flex-row gap-2 items-center">
                    <input type="radio" name="assessment" />
                    <label
                      htmlFor="assessment"
                      className="text-base text-secondary font-semibold">
                      Assessment
                    </label>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          )}
        </div>
       
          {activeTab === "Todo" ? (
            <Todo />
          ) : activeTab === "In Progress" ? (
            <InProgress />
          ) : activeTab === "Submitted For Review" ? (
            <ReviewAssessment />
          ) : (
            activeTab === "Completed" && <Completed />
          )}
          
        
      </div>
    </div>
  );
}

export default MyAssessment;
