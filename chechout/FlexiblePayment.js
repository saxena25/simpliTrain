import React from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import downArrow from "../../assets/svgs/downArrow.svg";
import upArrow from "../../assets/svgs/upArrow.svg";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { FloatingTextField } from "../../components/ui-components";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const steps = [
  { name: "7 days refund policy", status: "complete" },
  { name: "Unlimited access to course", status: "complete" },
  { name: "25% Discount", status: "complete" },
];

const plans = [
    { id: '1', name: '3 Month', description: '4200' },
    { id: '2', name: '6 Month', description: '2100' },
    { id: '3', name: '9 Month', description: '1450' },
  ]

function FlexiblePayment() {
  return (
    <div className="flex flex-col gap-2 pb-10">
      <h1 className="text-xl md:text-2xl text-secondary font-medium mb-2">
        Flexible Payments
      </h1>

      <div>
        <div className="bg-white px-7 py-5 rounded-tl-xl rounded-tr-xl border-b border-gray-200">
          <Disclosure as="div" className="">
            <DisclosureButton className="group flex w-full justify-between items-center gap-1 text-left text-gray-900">
              <fieldset aria-label="Plan">
                <div className="space-y-5">
                  <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        defaultChecked="true"
                        //   id={plan.id}
                        name="plan"
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                      />
                    </div>
                    <div className="ml-3 text-sm/6">
                      <label
                        htmlFor="oneTimePayment"
                        className="text-base md:text-lg font-medium text-[#040303] ml-3">
                        One time payment
                      </label>{" "}
                    </div>
                  </div>
                </div>
              </fieldset>

              <span className=" flex items-center">
                <img
                  src={downArrow}
                  aria-hidden="true"
                  alt=""
                  className="group-data-[open]:hidden"
                />
                <img
                  src={upArrow}
                  aria-hidden="true"
                  alt=""
                  className="group-[&:not([data-open])]:hidden"
                />
              </span>
            </DisclosureButton>
            <DisclosurePanel as="dd" className="my-4 px-6">
              <div className="py-2 md:py-6 px-3">
                <nav aria-label="Progress" className="flex ">
                  <ol role="list" className="space-y-6">
                    {steps.map((step) => (
                      <li key={step.name}>
                        {step.status === "complete" ? (
                          <a href={step.href} className="group">
                            <span className="flex items-start">
                              <span className="relative flex size-5 shrink-0 items-center justify-center">
                                <CheckCircleIcon
                                  aria-hidden="true"
                                  className="size-full text-gray-200  group-hover:text-indigo-800"
                                />
                              </span>
                              <span className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                                {step.name}
                              </span>
                            </span>
                          </a>
                        ) : step.status === "current" ? (
                          <a
                            href={step.href}
                            aria-current="step"
                            className="flex items-start">
                            <span
                              aria-hidden="true"
                              className="relative flex size-5 shrink-0 items-center justify-center">
                              <span className="absolute size-4 rounded-full bg-indigo-200" />
                              <span className="relative block size-2 rounded-full bg-indigo-600" />
                            </span>
                            <span className="ml-3 text-sm font-medium text-indigo-600">
                              {step.name}
                            </span>
                          </a>
                        ) : (
                          <a href={step.href} className="group">
                            <div className="flex items-start">
                              <div
                                aria-hidden="true"
                                className="relative flex size-5 shrink-0 items-center justify-center">
                                <div className="size-2 rounded-full bg-gray-300 group-hover:bg-gray-400" />
                              </div>
                              <p className="ml-3 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                                {step.name}
                              </p>
                            </div>
                          </a>
                        )}
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
            </DisclosurePanel>
          </Disclosure>
        </div>

        <div className="bg-white px-7 py-5 rounded-bl-xl rounded-br-xl border-b border-gray-200">
          <Disclosure as="div" className="">
            <DisclosureButton className="group flex w-full justify-between items-center gap-1 text-left text-gray-900">
              <fieldset aria-label="Plan">
                <div className="space-y-5">
                  <div className="relative flex items-start">
                    <div className="flex h-6 flex-col justify-center items-center">
                      <input
                        defaultChecked="true"
                        //   id={plan.id}
                        name="plan"
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                      />
                    </div>
                    
                      <label
                        htmlFor="oneTimePayment"
                        className="text-base md:text-lg font-medium text-[#040303] ml-6">
                        Installment plans
                      </label>{" "}
                    
                  </div>
                </div>
              </fieldset>

              <span className=" flex items-center">
                <img
                  src={downArrow}
                  aria-hidden="true"
                  alt=""
                  className="group-data-[open]:hidden"
                />
                <img
                  src={upArrow}
                  aria-hidden="true"
                  alt=""
                  className="group-[&:not([data-open])]:hidden"
                />
              </span>
            </DisclosureButton>
            <DisclosurePanel as="dd" className="my-4 px-9">
              <fieldset aria-label="Plan">
                <div className="space-y-5">
                  {plans.map((plan) => (
                    <div key={plan.id} className="relative flex items-start">
                      <div className="flex h-6 items-center">
                        <input
                          defaultChecked={plan.id === "1"}
                          id={plan.id}
                          name="plan"
                          type="radio"
                          aria-describedby={`${plan.id}-description`}
                          className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-black checked:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                        />
                      </div>
                      <div className="ml-3 text-sm/6">
                        <label
                          htmlFor={plan.id}
                          className="font-medium text-gray-900">
                          {plan.name}
                        </label>
                        <p
                          id={`${plan.id}-description`}
                          className="text-gray-500">
                          ₹{plan.description} / month
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>
            </DisclosurePanel>
          </Disclosure>
        </div>
      </div>
    </div>
  );
}

export default FlexiblePayment;
