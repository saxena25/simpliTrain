import React from "react";
import { useState } from "react";
import inBox from "../../../assets/svgs/inBox.svg";
import sendbtn from "../../../assets/svgs/sendbtn.svg";
import chatProfile from "../../../assets/svgs/chatprofile.svg";
import userCircle from "../../../assets/svgs/userCircle.svg";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import pencil from "../../../assets/svgs/pencil.svg";
import dustbin from "../../../assets/svgs/dustbin.svg";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CourseChat() {
  const [tabsData, setTabsData] = useState([
    { name: "Group Chat", href: "#", current: true },
    { name: "Melvin John", href: "#", current: false },
  ]);

  const [tabs, setTabs] = useState(tabsData);
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.current).name
  );

  const [messages, setMessages] = useState([
      {
        text: "You'll learn in-demand skills at your own in demand skills at your own skills at your own you'll on learn demand skills.",
        time: "09:21am",
        type: "received",
      },
      { text: "Thanks, sure", time: "09:22am", type: "sent" },
      {
        text: "Have you finished the Assignment?",
        time: "09:23am",
        type: "received",
      },
      { text: "I will finish it soon", time: "09:24am", type: "sent" },
      { text: "Tomorrow is the deadline", time: "09:25am", type: "received" },
      { text: "I'm aware of it", time: "09:26am", type: "sent" },
      { text: "Tomorrow is the deadline", time: "09:25am", type: "received" },
      { text: "I'm aware of it", time: "09:26am", type: "sent" },
      { text: "Tomorrow is the deadline", time: "09:25am", type: "received" },
      { text: "I'm aware of it", time: "09:26am", type: "sent" },
    ]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.name === tabName
          ? { ...tab, current: true }
          : { ...tab, current: false }
      )
    );
    // onActiveState(tabName);
  };
  return (
    <div className="w-full max-w-sm pt-6 pb-3 border-r border-gray-200 h-full flex flex-col justify-between">
      <h1 className="text-3xl text-black font-medium px-4 sm:px-6 lg:px-8">
        Chat
      </h1>
      <div className="border-b border-gray-200 flex flex-row justify-center items-center sticky top-16 bg-white">
        <nav
          aria-label="Tabs"
          className=" flex gap-2 space-x-8 px-4 sm:px-6 lg:px-8 mt-2">
          {tabs.map((tab) => (
            <div
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
                "whitespace-nowrap border-b-2 px-1 py-2 text-sm font-medium flex flex-row gap-2 hover:cursor-pointer z-10"
              )}>
              {tab.name === "Group Chat" ? (
                <img src={chatProfile} alt="" className="w-8" />
              ) : (
                <img src={userCircle} alt="" className="w-8" />
              )}
              <div className="flex flex-col items-center">
                <a>{tab.name}</a>
                {tab.name === "Group Chat" ? (
                  <p className="text-xs">30 Members</p>
                ) : (
                  <p className="text-xs">Instructor</p>
                )}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="relative px-2 h-full overflow-auto">
        {/* messages */}
        <div className="w-full flex flex-col gap-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`w-full flex flex-row items-center ${
                message.type === "received" ? "justify-start" : "justify-end"
              }`}>
              <div className="max-w-sm">
                {/* Message Bubble */}
                <p
                  className={`text-sm p-4 border rounded-tl-2xl rounded-tr-2xl ${
                    message.type === "received"
                      ? "rounded-br-2xl bg-white text-black"
                      : "rounded-bl-2xl bg-gray-200 text-black"
                  }`}>
                  {message.text}
                </p>
                {/* Timestamp */}
                <div
                  className={`text-xs mt-1 ${
                    message.type === "received" ? "text-left" : "text-right"
                  }`}>
                  <p>{message.time}</p>
                  {message.type === "sent" && (
                    <p className="text-gray-500">Read</p>
                  )}
                </div>
              </div>
              {index === messages.length - 1 && message.type === "sent" && (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <MenuButton className="flex items-center rounded-full overflow-hidden transition-transform duration-300 ease-in-out hover:scale-110  text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-offset-gray-100">
                      <span className="sr-only">Open options</span>
                      <EllipsisVerticalIcon
                        aria-hidden="true"
                        className="size-6 text-black"
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className="absolute right-4 top-4 z-10 mt-2 w-48 origin-top-right rounded-2xl bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                    <div className="py-4 px-8">
                      <MenuItem
                        as="div"
                        className="flex flex-row  items-center">
                        <img src={pencil} alt="" />
                        <a
                          href="#"
                          className="block px-2 py-2 text-base font-medium text-secondary data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none white-space:nowrap">
                          Edit
                        </a>
                      </MenuItem>
                      <MenuItem as="div" className="flex flex-row items-center">
                        <img src={dustbin} alt="" />
                        <a
                          href="#"
                          className="block px-2 py-2 text-base font-medium text-secondary data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                          Delete
                        </a>
                      </MenuItem>
                      
                    </div>
                  </MenuItems>
                </Menu>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* input send button */}
      <div className="w-full bg-white flex flex-row gap-6 px-4">
        <button className="">
          <img src={inBox} alt="" />
        </button>
        <div className="w-full bg-[#ECEEF2] flex flex-row rounded-2xl relative py-2">
          <input
            type="text"
            placeholder="Type a message"
            className="bg-[#ECEEF2] border-none w-full rounded-2xl pl-2"
          />
          <button className="bg-black px-4 py-3 rounded-2xl absolute top-2 right-2">
            <img src={sendbtn} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseChat;
