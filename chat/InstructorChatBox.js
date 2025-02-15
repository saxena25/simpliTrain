import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import chatprofile from "../../assets/svgs/chatprofile.svg";
import share from "../../assets/svgs/share.svg";
import info from "../../assets/svgs/info.svg";
import dustbin from "../../assets/svgs/dustbin.svg";
import sendbtn from "../../assets/svgs/sendbtn.svg";
// import share from "../../assets/svgs/share.svg"
import inBox from "../../assets/svgs/inBox.svg";
import pencil from "../../assets/svgs/pencil.svg";
import { checkIsMobile } from "../../utils/helpers";
import reviewLeftArrow from "../../assets/svgs/reviewLeftArrow.svg";
import { useNavigate } from "react-router-dom";

export async function InstructorChatBoxLoader() {
  return {
    date: new Date().toISOString(),
  };
}

function InstructorChatBox() {
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
  const navigate = useNavigate();

  const isMobile = checkIsMobile();

  return (
    <div className={`w-full  py-6 flex flex-col gap-5 justify-between h-full`}>
      {/* chat header */}
      <div className="flex flex-col gap-2 border-b border-gray-200 pb-3">
        {isMobile && (
          <button className="mx-6 bg-gray-100 w-fit px-2 py-2 rounded-full" onClick={()=>navigate("/chat")}>
            <img src={reviewLeftArrow} alt="" />
          </button>
        )}
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4 px-8 justify-center items-center">
            <img src={chatprofile} alt="" />
            <div className="flex flex-col items-center">
              <h1 className="text-lg text-secondary font-bold">Melvin John</h1>
              <p className="text-xs text-primary px-3 py-1 border w-fit border-gray-200 rounded-full">
                INSTRUCTOR
              </p>
            </div>
          </div>
          <Menu as="div" className="relative inline-block text-left px-8">
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
              className="absolute right-14 top-6 z-10 mt-2 w-60 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
              <div className="py-1 px-4">
                <MenuItem as="div" className="flex flex-row  items-center">
                  <img src={info} alt="" />
                  <a
                    href="#"
                    className="block px-4 py-2 text-base text-secondary data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none white-space:nowrap">
                    View Instructor Details
                  </a>
                </MenuItem>
                <MenuItem as="div" className="flex flex-row items-center">
                  <img src={share} alt="" />
                  <a
                    href="#"
                    className="block px-4 py-2 text-base text-secondary data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                    Share Profile
                  </a>
                </MenuItem>
                <MenuItem as="div" className="flex flex-row  items-center">
                  <img src={dustbin} alt="" />
                  <a
                    href="#"
                    className="block px-4 py-2 text-base text-secondary data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                    Clear Chat
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>

      {/* chat body */}
      <div className="relative px-8 h-full overflow-auto">
        {/* messages */}
        <div className="w-full flex flex-col gap-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`w-full flex flex-row items-center ${
                message.type === "received" ? "justify-start" : "justify-end"
              }`}>
              <div className={`max-w-[60%] md:max-w-sm`}>
                {/* Message Bubble */}
                <p
                  className={`${
                    isMobile ? "text-sm" : "text-base"
                  } p-4 border rounded-tl-2xl rounded-tr-2xl ${
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

      {/* send message input */}
      <div className={`w-full bg-white flex flex-row md:gap-6 px-5 md:px-12 py-2 ${isMobile ? "fixed bottom-0" : ""}`}>
        <button className="px-4 py-4">
          <img src={inBox} alt="" />
        </button>
        <div className="w-full bg-[#ECEEF2] flex flex-row rounded-2xl relative">
          <input
            type="text"
            placeholder="Type a message"
            className="bg-[#ECEEF2] border-none w-full rounded-2xl pl-8"
          />
          <button className="bg-black px-4 py-3 rounded-2xl absolute top-2 right-2">
            <img src={sendbtn} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstructorChatBox;
