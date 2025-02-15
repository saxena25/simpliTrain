import React from "react";
import { useState } from "react";
import InstructorsChat from "./InstructorsChat";
import CoursesChat from "./CourseChat";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ChatSideBar({ onActiveState }) {
  const [tabsData, setTabsData] = useState([
    { name: "INSTRUCTORS", href: "#", current: true },
    { name: "COURSES", href: "#", current: false },
  ]);

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
    onActiveState(tabName);
  };
  return (
    <div className="w-full max-w-sm pt-6 border-r border-gray-200 h-full flex flex-col justify-between">
      <h1 className="text-4xl text-black font-medium px-4 sm:px-6 lg:px-8">
        Chat
      </h1>
      <div className="border-b border-gray-200 flex flex-row justify-between items-center sticky top-16 bg-white">
        <nav aria-label="Tabs" className=" flex space-x-8 px-4 sm:px-6 lg:px-8">
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
                "whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium"
              )}>
              {tab.name}
            </a>
          ))}
        </nav>
      </div>

      <div className="w-full h-full overflow-auto">
        {activeTab === "INSTRUCTORS" ? (
          <InstructorsChat />
        ) : (
          activeTab === "COURSES" && <CoursesChat />
        )}
      </div>
    </div>
  );
}

export default ChatSideBar;
