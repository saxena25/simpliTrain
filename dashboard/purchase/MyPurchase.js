import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { checkIsMobile } from "../../../utils/helpers";
import reviewLeftArrow from "../../../assets/svgs/reviewLeftArrow.svg";
import PaymentHistory from "./PaymentHistory";

const purchaseData = [
  {
    dueDate: "03 April",
    timeLeft: "5 days left",
    title: "Your next payment is due in 5 days.",
    course: "How to cook the best dum chicken biryani recipe.",
    installment: "4th installment",
    amount: "₹ 9,999",
  },
  {
    dueDate: "23 March",
    timeLeft: "2 days left",
    title: "Your next payment is due in 5 days.",
    course: "How to cook the best dum chicken biryani recipe.",
    installment: "4th installment",
    amount: "₹ 9,999",
  },
  {
    dueDate: "25 May",
    timeLeft: "2 weeks left",
    title: "Your next payment is due in 5 days.",
    course: "How to cook the best dum chicken biryani recipe.",
    installment: "4th installment",
    amount: "₹ 9,999",
  },
];

function MyPurchase({ data }) {
  const isMobile = checkIsMobile();
  return (
    <div className="flex flex-col gap-6">
      {isMobile && (
        <div className="flex flex-row gap-4 pt-8">
          <div className="bg-white rounded-full flex justify-center items-center">
            <img src={reviewLeftArrow} alt="" className="py-2 px-3" />
          </div>
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              className="w-full border-none rounded-full pl-12 py-3"
            />
            <MagnifyingGlassIcon className="w-5 absolute top-[14px] left-4 text-[#363A49]" />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-semibold text-secondary">My Purchase</h1>
        {data.length > 0 ? (
          <p className="text-sm text-primary">
            You have {data.length} Payment History
          </p>
        ) : (
          <p className="text-sm text-primary">No Payment History Found</p>
        )}
      </div>
      <PaymentHistory data={data} />
      {/* <div className="flex flex-col gap-7 relative">
        {purchaseData.map((ele, index) => (
          <div
            key={index}
            className={`relative flex ${
              isMobile ? "flex-col" : "flex-row"
            } justify-between bg-gray-50 rounded-xl px-5 py-3 shadow-lg
             shadow-gray-200`}>
            <div className={`flex flex-row w-full gap-4`}>
              <div className="absolute -top-3 left-36 text-xs text-white bg-[#0E121D80] px-2 py-1 rounded-xl">
                {ele.timeLeft}
              </div>
              
              <div className="bg-gray-200 w-24 h-fit py-5 rounded-2xl flex flex-col justify-center items-center">
                <p className="text-xs text-primary">Due Date</p>
                <p className="text-sm text-secondary font-medium">
                  {ele.dueDate}
                </p>
              </div>
              <div
                className={`flex ${
                  isMobile ? "flex-col gap-3 max-w-xs" : "flex-row gap-8"
                } justify-between w-full`}>

                
                <div className="flex flex-col">
                  <h2 className="text-base text-secondary font-medium">
                    Alert: {ele.title}
                  </h2>
                  <p className="text-sm text-primary">Course: {ele.course}</p>
                  <p className="text-sm text-primary">{ele.installment}</p>
                </div>

                
                <div
                  className={`flex flex-row gap-4 md:justify-center items-center`}>
                  <p className="text-base text-secondary font-medium">
                    {ele.amount}
                  </p>
                  <button className="bg-black text-xs text-white rounded-xl px-6 py-3">
                    Pay now
                  </button>
                  <div className={`${isMobile ? "absolute top-3 right-1" : ""}`}>
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <MenuButton className="flex items-center rounded-full  text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-offset-gray-100">
                          <span className="sr-only">Open options</span>
                          <EllipsisVerticalIcon
                            aria-hidden="true"
                            className="size-6"
                          />
                        </MenuButton>
                      </div>

                      <MenuItems
                        transition
                        className="absolute right-8 top-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                        <div className="py-1">
                          <MenuItem>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                              Set as default
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                              Remove as default
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
                              Remove Card
                            </a>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default MyPurchase;
