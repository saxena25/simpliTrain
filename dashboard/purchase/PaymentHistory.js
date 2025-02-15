import React from "react";
import { Container } from "../../../components/ui-components";
import SMS from "../../../assets/svgs/SMS.svg";
import inBox from "../../../assets/svgs/inBox.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { checkIsMobile } from "../../../utils/helpers";
import moment from "moment/moment";

const paymentData = [
  {
    paymentDate: "20 Feb 2024",
    transitionID: "14768",
    amount: "9,999",
    paymentType: "Fully Paid",
    course: "How to Becoming UX designer",
  },
  {
    paymentDate: "20 Feb 2024",
    transitionID: "14768",
    amount: "9,999",
    paymentType: "Fully Paid",
    course: "How to Becoming UX designer",
  },
  {
    paymentDate: "20 Feb 2024",
    transitionID: "14768",
    amount: "9,999",
    paymentType: "Fully Paid",
    course: "How to Becoming UX designer",
  },
  {
    paymentDate: "20 Feb 2024",
    transitionID: "14768",
    amount: "9,999",
    paymentType: "Fully Paid",
    course: "How to Becoming UX designer",
  },
  {
    paymentDate: "20 Feb 2024",
    transitionID: "14768",
    amount: "9,999",
    paymentType: "Fully Paid",
    course: "How to Becoming UX designer",
  },
];

function paymentHistory({ data }) {
  const isMobile = checkIsMobile();
  // console.log("Payment History: ", data)
  return (
    <div className="w-full flex flex-col gap-6 overflow-y-auto h-2/3">
      {data.map((ele, index) => (
        <div
          className="flex flex-row justify-between  bg-gray-100  px-5 py-6 rounded-2xl"
          key={index}>
          <div className="flex flex-col gap-1">
            {/* <div className={`flex ${isMobile ? "flex-col" : "flex-row gap-2"} `}>
              <p className="text-sm text-primary">
                <b>Payment date:</b> 11:11:11
              </p>
              <p
                className={`text-sm text-primary ${
                  isMobile ? "hidden" : "flex"
                }`}>
                |
              </p>
              <div className={`flex flex-row ${isMobile ? "gap-2" : "gap-0"}`}>
                {ele?.orderId === null || ele?.orderId === undefined ? "" : (
                  <p className="text-sm text-primary whitespace-nowrap">
                  <b>Transition ID:</b> {ele?.orderId}
                </p>
                )}
                
                <p className="text-sm text-primary">|</p>
                {ele.amount === null || ele.amount === undefined ? "" : (
                  <p className="text-sm text-primary whitespace-nowrap">
                  <b>Amount:</b> {ele.amount}
                </p>
                )}
                
              </div>

              <p
                className={`text-sm text-primary ${
                  isMobile ? "hidden" : "flex"
                }`}>
                |
              </p>
              <p className="text-sm text-primary">
                <b>Payment Type:</b> {ele.paymentStatus}
              </p>
            </div> */}
            <div className={`flex ${isMobile ? "flex-col" : "flex-row gap-2"}`}>
              <p className="text-sm text-primary">
                <b>Payment date:</b>{" "}
                {moment(ele?.paymentDate).format("DD MMM YYYY")}
              </p>

              {ele?.razorpay_payment_id && (
                <>
                  {!isMobile && <p className="text-sm text-primary">|</p>}
                  <p className="text-sm text-primary whitespace-nowrap">
                    <b>Transaction ID:</b> {ele.razorpay_payment_id}
                  </p>
                </>
              )}

              {ele?.amount && (
                <>
                  <p className="text-sm text-primary">|</p>
                  <p className="text-sm text-primary whitespace-nowrap">
                    <b>Amount:</b> {ele.amount}
                  </p>
                </>
              )}

              {ele?.transaction && (
                <>
                  {!isMobile && <p className="text-sm text-primary">|</p>}
                  <p className="text-sm text-primary">
                    <b>Payment Type:</b> {ele?.transaction?.paymentStatus}
                  </p>
                </>
              )}
            </div>

            <h1 className="text-base md:text-lg text-secondary font-medium">
              {ele?.batchDetails?.title}
            </h1>
          </div>
          <div className="flex flex-row gap-2 md:gap-6">
            <img src={SMS} alt="" className="size-5 md:size-6" />
            <img src={inBox} alt="" className="size-5 md:size-6" />
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="flex items-center rounded-full  text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-offset-gray-100">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
                    aria-hidden="true"
                    className="size-5 md:size-6"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-4 md:right-8 top-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
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
      ))}
    </div>
  );
}

export default paymentHistory;
