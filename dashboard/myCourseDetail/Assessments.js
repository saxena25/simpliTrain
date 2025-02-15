import React from "react";
import { useState, useRef } from "react";
import Todo from "./Todo";
import InProgress from "./InProgress";
import ReviewAssessment from "./ReviewAssessment";
import Completed from "./Completed";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import all from "../../../assets/svgs/all.svg";
import { checkIsMobile } from "../../../utils/helpers";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Assessments() {
  const tabsData = [
    { name: "Todo", href: "#", task: "2", current: true },
    { name: "In Progress", href: "#", task: "5", current: false },
    { name: "Submitted For Review", task: "1", href: "#", current: false },
    { name: "Completed", href: "#", task: "", current: false },
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
    <div className={`bg-gray-100 w-full ${isMobile ? "px-2" : "px-6"}`}>
      <div className="md:pl-0 flex flex-row justify-between items-center">
        <nav
          aria-label="Tabs"
          className={`-mb-px flex md:space-x-2 py-4 ${
            isMobile &&
            "justify-start overflow-x-auto scroll whitespace-normal scroll-smooth gap-1 custom-scroll ml-1"
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
                  ? " text-gray-900 bg-white rounded-full"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                "whitespace-nowrap px-2 py-1 md:px-4 md:py-2 text-base font-medium"
              )}>
              {tab.name}{" "}
              {tab.task === "" ? null : (
                <span
                  className={classNames(
                    tab.current ? "text-gray-900" : "text-gray-500",
                    "bg-gray-200 px-2 py-px rounded-full ml-1"
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
            className="relative inline-block text-left bg-white rounded-full">
            <MenuButton className="flex flex-row justify-evenly items-center px-2 py-1 gap-1 rounded-4xl border border-gray-3 hover:shadow-3xl">
              <img src={all} alt="" />
              <p>All</p>
            </MenuButton>

            <MenuItems
              transition
              // right-0 z-10 mt-2
              className="absolute z-10 right-0 top-[46px] w-44 origin-top-right divide-y divide-gray-6 rounded-2xl bg-white shadow-3xl transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in flex flex-col justify-center">
              <div className="py-6 px-8 flex flex-col gap-3">
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
  );
}

export default Assessments;
