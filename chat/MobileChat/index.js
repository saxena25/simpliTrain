import React from "react";
import { useState } from "react";
import MobContainer from "../../../components/ui-components/MobContainer";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import InstructorsChat from "../InstructorsChat";
import CoursesChat from "../CourseChat";

export async function MobileChatLoader() {
  return {
    date: new Date().toISOString(),
  };
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MobileChat() {
  const [tabsData, setTabsData] = useState([
    { name: "One on One", href: "#", current: true },
    { name: "Group", href: "#", current: false },
    { name: "Community", href: "#", current: false },
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
  };
  return (
    <MobContainer className="h-[calc(100vh-64px)]">
      <div className="w-full h-full flex flex-col gap-3 justify-between">
        <h1 className="text-3xl text-black font-medium ">Chat</h1>
        <div className="bg-[#e8e8e8] relative h-14 rounded-4xl">
            <input type="text" placeholder="Search chat" className="bg-[#e8e8e8] text-sm w-full h-full border-none rounded-4xl pl-6" />
            <div className="absolute top-1 right-1 bg-[#B7BCC2] px-3 py-2 rounded-full">
                <MagnifyingGlassIcon
                    className="pointer-events-none h-5 w-5 rounded-full text-white"
                    aria-hidden="true"
                />
            </div>
        </div>
        <div className="w-full flex flex-row justify-between items-center bg-white">
          <nav
            aria-label="Tabs"
            className="w-full flex flex-row space-x-8 px-4 justify-center">
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
                    ? " text-white bg-[#000000]"
                    : "    hover:text-gray-700",
                  "whitespace-nowrap px-3 py-1 text-sm font-medium border border-gray-500 rounded-4xl"
                )}>
                {tab.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="w-full h-full overflow-auto">
          {activeTab === "One on One" ? (
            <InstructorsChat />
          ) : (
            activeTab === "Group" && <CoursesChat />
          )}
        </div>
      </div>
    </MobContainer>
  );
}

export default MobileChat;
