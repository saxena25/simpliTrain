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
import groupPhotos from "../../assets/svgs/groupPhotos.svg";
import { Drawer } from "../../components/ui-components";

function CourseChatBox() {
  const [open, setOpen] = useState(false);
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
  ]);

  return (
    <>
      <div className="w-full py-6 flex flex-col">
        {/* chat header */}
        <div className="flex flex-row justify-between items-center border-b border-gray-200 pb-3">
          <div className="flex flex-row gap-4 px-8 justify-center items-center">
            <img src={chatprofile} alt="" />
            <div className="flex flex-col">
              <h1 className="text-lg text-secondary font-bold">
                Introduction for python
              </h1>
              <div className="flex flex-row gap-2 items-center" >
                <p className="text-xs text-primary">Batch 1</p>
                <div className="px-3 py-1 border w-fit border-gray-200 rounded-full flex flex-row items-center hover:cursor-pointer" onClick={()=>setOpen(true)}>
                  <img src={groupPhotos} alt="" />
                  <p className="text-xs text-primary ">+ 20 Participants</p>
                </div>
              </div>
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

        {/* chat body */}
        <div className="relative px-8 py-4">
          {/* messages */}
          <div className="w-full flex flex-col gap-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`w-full flex ${
                  message.type === "received" ? "justify-start" : "justify-end"
                }`}>
                <div className="max-w-sm">
                  {/* Message Bubble */}
                  <p
                    className={`p-4 border rounded-tl-2xl rounded-tr-2xl ${
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
              </div>
            ))}
          </div>
          {/* send message input */}
          <div className="w-full bg-white flex flex-row gap-6">
            <button className="px-4 py-4">
              <img src={inBox} alt="" />
            </button>
            <div className="w-full bg-[#ECEEF2] flex flex-row rounded-full relative">
              <input
                type="text"
                placeholder="Type a message"
                className="bg-[#ECEEF2] border-none w-full rounded-full pl-8"
              />
              <button className="bg-black px-4 py-3 rounded-3xl absolute top-2 right-2">
                <img src={sendbtn} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Drawer open={open} onClose={setOpen} title="Edit Personal Information">
             
      </Drawer>
    </>
  );
}

export default CourseChatBox;
