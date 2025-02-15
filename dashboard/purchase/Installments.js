import React from "react";
import { useState } from "react";
import SMS from "../../../assets/svgs/SMS.svg";
import inBox from "../../../assets/svgs/inBox.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { CollapseProps } from "antd";
import { CheckIcon } from "@heroicons/react/20/solid";
// import { Collapse } from "antd";
import { Steps } from "antd";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const steps = [
  { name: "Step 1", href: "#", status: "complete" },
  { name: "Step 2", href: "#", status: "complete" },
  { name: "Step 3", href: "#", status: "complete" },
  { name: "Step 4", href: "#", status: "current" },
];

const installments = [
  {
    dueDate: "20 Feb 2024",
    transitionID: "14768",
    amount: "9,999",
    paymentType: "Fully Paid",
    course: "How to Becoming UX designer",
    installment: "1st Installment : 13 Oct",
  },
  {
    dueDate: "20 Feb 2024",
    transitionID: "14768",
    amount: "9,999",
    paymentType: "Fully Paid",
    course: "How to Becoming UX designer",
    installment: "2nd Installment : 13 Oct",
  },
  {
    dueDate: "20 Feb 2024",
    transitionID: "14768",
    amount: "9,999",
    paymentType: "Fully Paid",
    course: "How to Becoming UX designer",
    installment: "3rd Installment : 13 Oct",
  },
  {
    dueDate: "20 Feb 2024",
    transitionID: "14768",
    amount: "9,999",
    paymentType: "Fully Paid",
    course: "How to Becoming UX designer",
    installment: "4th Installment : 13 Oct",
  },
];

const verticalStepsData = [
  {
    installment: "1st Installment : 13 Oct",
    payment: true,
    amount: "1999",
    status: "complete",
  },
  {
    installment: "2nd Installment : 11 Nov",
    payment: true,
    amount: "1010",
    status: "complete",
  },
  {
    installment: "3rd Installment : 15 Dec",
    payment: true,
    amount: "9999",
    status: "complete",
  },
  {
    installment: "4rd Installment : 01 Jan",
    payment: false,
    amount: "1999",
    status: "current",
  },
  {
    installment: "5rd Installment : 02 Feb",
    payment: false,
    amount: "1999",
    status: "upcoming",
  },
];

function Installments() {
  const [stepsVertical, setStepsVertical] = useState(false);

  const [expandedCards, setExpandedCards] = useState(
    Array(installments.length).fill(false)
  );

  const toggleExpand = (index) => {
    setExpandedCards((prev) =>
      prev.map((state, idx) => (idx === index ? !state : state))
    );
  };

  const onChange = () => {
    console.log("change event");
  };
  return (
    <div className="w-full px-5 md:px-14 my-5 flex flex-col gap-6 overflow-y-auto h-[40vh]">
      <div className="flex flex-col gap-6">
        {installments.map((ele, index) => (
          <div
            key={index}
            className="group flex flex-row w-full items-start justify-between text-left text-gray-900 bg-white p-5 rounded-2xl md:shadow-lg md:shadow-gray-200 md:bg-gray-50 ">
            <div className="w-full flex flex-col gap-4">
              <div>
                <h1 className="text-base md:text-lg text-secondary font-medium">
                  {ele.course}
                </h1>
                <p className="text-primary text-xs md:text-sm">
                  Next Due Date : {ele.dueDate}
                </p>
              </div>
              <div className="flex flex-row gap-4 md:w-[30%] items-center">
                {!expandedCards[index] && (
                  <nav aria-label="Progress">
                    <ol role="list" className="flex items-center">
                      {steps.map((step, stepIdx) => (
                        <li
                          key={step.name}
                          className={classNames(
                            stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
                            "relative"
                          )}>
                          {step.status === "complete" ? (
                            <>
                              <div
                                aria-hidden="true"
                                className="absolute inset-0 flex items-center">
                                <div className="h-0.5 w-full bg-[#292D32]" />
                              </div>
                              <a
                                href="#"
                                className="relative flex size-4 md:size-5 items-center justify-center rounded-full bg-[#292D32] ">
                                <CheckIcon
                                  aria-hidden="true"
                                  className="size-3 text-white"
                                />
                                <span className="sr-only">{step.name}</span>
                              </a>
                            </>
                          ) : step.status === "current" ? (
                            <>
                              <div
                                aria-hidden="true"
                                className="absolute inset-0 flex items-center">
                                <div className="h-0.5 w-full bg-gray-200" />
                              </div>
                              <a
                                href="#"
                                aria-current="step"
                                className="relative flex size-4 md:size-5 items-center justify-center rounded-full border-2 border-[#292D32] bg-white">
                                <span
                                  aria-hidden="true"
                                  className="size-2 rounded-full bg-[#292D32]"
                                />
                                <span className="sr-only">{step.name}</span>
                              </a>
                            </>
                          ) : (
                            <>
                              <div
                                aria-hidden="true"
                                className="absolute inset-0 flex items-center">
                                <div className="h-0.5 w-full bg-gray-200" />
                              </div>
                              <a
                                href="#"
                                className="group relative flex size-5 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
                                <span
                                  aria-hidden="true"
                                  className="size-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                                />
                                <span className="sr-only">{step.name}</span>
                              </a>
                            </>
                          )}
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}

                <button
                  onClick={() => toggleExpand(index)}
                  className={`group flex flex-row w-full items-start justify-between text-left text-gray-900 whitespace-nowrap text-xs underline text-primary h-3 ${expandedCards[index] && "hidden"}`}>
                  View Details
                </button>

                {/* vertical Line */}
                {expandedCards[index] && (
                  <div className="flex flex-col z-0">
                    <nav aria-label="Progress" className="">
                      <ol role="list" className="overflow-hidden flex flex-col">
                        {verticalStepsData.map((step, stepIdx) => (
                          <li
                            key={step.installment}
                            className={classNames(
                              stepIdx !== steps.length - 1 ? "pb-2" : "",
                              "relative"
                            )}>
                            {step.status === "complete" ? (
                              <>
                                {stepIdx !== steps.length - 1 ? (
                                  <div
                                    aria-hidden="true"
                                    className="absolute left-2 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-400"
                                  />
                                ) : null}
                                <p className="group relative flex items-center">
                                  <span className="flex h-9 items-center">
                                    <span className="relative flex size-4 items-center justify-center rounded-full bg-black group-hover:bg-black">
                                      <CheckIcon
                                        aria-hidden="true"
                                        className="size-3 text-white bg-black"
                                      />
                                    </span>
                                  </span>
                                  <span className="ml-4 flex min-w-0 flex-row flex-wrap items-center">
                                    <span className="text-xs">
                                      {step.installment} |
                                    </span>
                                    <span className="text-xs text-gray-500">
                                    &nbsp;{step.amount} |
                                    </span>
                                    {step.payment ? (
                                      <span className="text-xs text-gray-500">&nbsp;Paid</span>
                                    ) : (
                                      <span>&nbsp;Your Next Pay</span>
                                    )}
                                  </span>
                                </p>
                              </>
                            ) : step.status === "current" ? (
                              <>
                                
                                  <div
                                    aria-hidden="true"
                                    className="absolute left-2 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-400"
                                  />
                                
                                <p
                                  aria-current="step"
                                  className="group relative flex items-center pb-2">
                                  <span
                                    aria-hidden="true"
                                    className="flex h-9 items-center">
                                    <span className="relative flex size-4 items-center justify-center rounded-full border-2 border-black bg-white">
                                      <span className="size-2 rounded-full bg-black" />
                                    </span>
                                  </span>
                                  <span className="ml-4 flex min-w-0 flex-row flex-wrap items-center">
                                    <span className="text-xs font-medium">
                                      {step.installment} |
                                    </span>
                                    <span className="text-xs text-gray-500">
                                    &nbsp;{step.amount}&nbsp; 
                                    </span>
                                    {step.payment ? (
                                      <span className="text-xs text-gray-500">&nbsp;Paid</span>
                                    ) : (
                                      <span className="text-[11px] text-white bg-black px-1 py-px rounded-full ml-px">&nbsp;Your Next Pay</span>
                                    )}
                                  </span>
                                </p>
                              </>
                            ) : (
                              <>
                                {/* {stepIdx !== steps.length - 1 ? (
                                  <div
                                  aria-hidden="true"
                                  className="absolute left-2 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-400"
                                />
                                ) : null} */}
                                <p className="group relative flex items-center">
                                  <span
                                    aria-hidden="true"
                                    className="flex h-9 items-center">
                                    <span className="relative flex size-4 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                                      <span className="size-2 rounded-full bg-transparent group-hover:bg-gray-300" />
                                    </span>
                                  </span>
                                  <span className="ml-4 flex min-w-0 flex-row flex-wrap">
                                    <span className="text-xs font-medium text-gray-500">
                                      {step.installment} |
                                    </span>
                                    <span className="text-xs text-gray-500">
                                    &nbsp;{step.amount}
                                    </span>
                                    
                                  </span>
                                </p>
                              </>
                            )}
                          </li>
                        ))}
                      </ol>
                    </nav>
                    <button onClick={() => toggleExpand(index)}
                      className="group flex flex-row w-full items-start justify-between text-left text-gray-900 whitespace-nowrap text-xs underline text-primary h-3">View Less</button>
                  </div>
                )}
              </div>
            </div>

            <div className={`flex flex-row gap-2 md:gap-6`}>
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
    </div>
  );
}

export default Installments;
